let daSong = null;
const monsterUpdated = new Event("monsterUpdated");

// audio engine shenanigans
const audioBufferCache = new Map();
let audioContext = null;
const activeSources = [];
const playbackState = new Map();
const fileGainNodes = new Map();
const fileAnalyserNodes = new Map();
const fadeDuration = 0.2;

async function preloadAudio(fileUrl)
{
    if (!audioContext)
    {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    if (audioBufferCache.has(fileUrl)) return;

    const response = await fetch(fileUrl);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    audioBufferCache.set(fileUrl, audioBuffer);
}

async function preloadAllAudio(fileUrls)
{
    await Promise.all(fileUrls.map(preloadAudio));
}

async function playFilesInSync(fileUrls)
{
    if (!audioContext)
    {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const buffers = await Promise.all(
        fileUrls.map(async url =>
        {
            if (audioBufferCache.has(url))
            {
                return audioBufferCache.get(url);
            }
            else
            {
                // fallback if not preloaded (for some reason)
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                const buffer = await audioContext.decodeAudioData(arrayBuffer);
                audioBufferCache.set(url, buffer);
                return buffer;
            }
        })
    );

    const startTime = audioContext.currentTime + 0.1;

    buffers.forEach((buffer, i) =>
    {
        const fileUrl = fileUrls[i];
    
        const source = audioContext.createBufferSource();
        source.buffer = buffer;
    
        // gain node for mute and solo
        let fileGain = fileGainNodes.get(fileUrl);
        if (!fileGain)
        {
            fileGain = audioContext.createGain();
            fileGainNodes.set(fileUrl, fileGain);
        }

        // analyser for audio visualizer
        let fileAnalyser = fileAnalyserNodes.get(fileUrl);
        if (!fileAnalyser)
        {
            fileAnalyser = audioContext.createAnalyser();
            fileAnalyserNodes.set(fileUrl, fileAnalyser);
            fileAnalyser.fftSize = 64;
        }
    
        fileGain.connect(fileAnalyser);
        fileAnalyser.connect(audioContext.destination);
        source.connect(fileGain);
    
        const offset = 0;
        const startTime = audioContext.currentTime + 0.1;
        source.start(startTime, offset);
    
        activeSources.push({ source, url: fileUrl, startTime, offset });
    
        playbackState.set(fileUrl,
        {
            offset: 0,
            isPaused: false,
            startTimestamp: startTime
        });
    });
}

function muteAudio(fileUrl)
{
    const gainNode = fileGainNodes.get(fileUrl);
    if (gainNode)
    {
        const now = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(0, now + fadeDuration);
    }
}

function unmuteAudio(fileUrl)
{
    const gainNode = fileGainNodes.get(fileUrl);
    if (gainNode)
    {
        const now = audioContext.currentTime;
        gainNode.gain.cancelScheduledValues(now);
        gainNode.gain.setValueAtTime(gainNode.gain.value, now);
        gainNode.gain.linearRampToValueAtTime(1, now + fadeDuration);
    }
}

function pauseAudio(fileUrl)
{
    activeSources.forEach(({ source, url, startTime, offset }, index) =>
    {
        if (url === fileUrl)
        {
            try
            {
                source.stop();

                const elapsed = audioContext.currentTime - startTime;
                const state = playbackState.get(fileUrl);
                if (state)
                {
                    state.offset += elapsed;
                    state.isPaused = true;
                }

            } catch (e)
            {
                console.warn("Error pausing", fileUrl, e);
            }
        }
    });

    for (let i = activeSources.length - 1; i >= 0; i--)
    {
        if (activeSources[i].url === fileUrl)
        {
            activeSources.splice(i, 1);
        }
    }
}

function resumeAudio(fileUrl)
{
    const buffer = audioBufferCache.get(fileUrl);
    const state = playbackState.get(fileUrl);

    if (!buffer || !state || !state.isPaused) return;

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);

    const offset = state.offset || 0;
    const startTime = audioContext.currentTime + 0.05;
    source.start(startTime, offset);

    activeSources.push({ source, url: fileUrl, startTime, offset });

    state.isPaused = false;
    state.startTimestamp = startTime;
}

function pauseAllAudio()
{
    activeSources.forEach(({ source, url, startTime }) => {
        try
        {
            source.stop();

            const elapsed = audioContext.currentTime - startTime;
            const state = playbackState.get(url);
            if (state && !state.isPaused)
            {
                state.offset += elapsed;
                state.isPaused = true;
            }
        } catch (e)
        {
            console.warn("Error pausing", url, e);
        }
    });

    activeSources.length = 0; // clear all sources
}

function resumeAllAudio()
{
    if (!audioContext || audioContext.state === "closed")
    {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    playbackState.forEach((state, url) =>
    {
        if (!state.isPaused) return;

        const buffer = audioBufferCache.get(url);
        if (!buffer) return;

        let fileGain = fileGainNodes.get(url);
        if (!fileGain)
        {
            fileGain = audioContext.createGain();
            fileGain.connect(audioContext.destination);
            fileGainNodes.set(url, fileGain);
        }

        const source = audioContext.createBufferSource();
        source.buffer = buffer;
        source.connect(fileGain);

        const offset = state.offset || 0;
        const startTime = audioContext.currentTime + 0.05;
        source.start(startTime, offset);

        activeSources.push({ source, url, startTime, offset });

        state.isPaused = false;
        state.startTimestamp = startTime;
    });
}

function clearAudioCache()
{
    audioBufferCache.clear();
}

function stopAudio(fileUrl)
{
    activeSources.forEach(({ source, url }, index) =>
    {
        if (url === fileUrl)
        {
            try
            {
                source.stop();
            } catch (e)
            {
                console.warn("Failed to stop source for", fileUrl, e);
            }
        }
    });

    for (let i = activeSources.length - 1; i >= 0; i--)
    {
        if (activeSources[i].url === fileUrl)
        {
            activeSources.splice(i, 1);
        }
    }
}

function stopAllAudio()
{
    activeSources.forEach(({ source, url }, index) =>
    {
        try
        {
            source.stop();
        } catch (e)
        {
            console.warn("Source already stopped or invalid", e);
        }
    });
    activeSources.length = 0;
}

function getClosestNodeToMouse(nodes, mouseX, mouseY)
{
    let closest = null;
    let minDistance = Infinity;
  
    nodes.forEach(node =>
    {
        const el = node.element;
        const rect = el.getBoundingClientRect();
    
        const clampedX = Math.max(rect.left, Math.min(mouseX, rect.right));
        const clampedY = Math.max(rect.top, Math.min(mouseY, rect.bottom));
    
        const dx = mouseX - clampedX;
        const dy = mouseY - clampedY;
        const distance = Math.sqrt(dx * dx + dy * dy);
    
        if (distance < minDistance)
        {
            minDistance = distance;
            closest = node;
        }
    });
  
    return closest;
}

function areBoundingBoxesOverlapping(node1, node2)
{
    const el1 = node1.element;
    const el2 = node2.element;
    const rect1 = el1.getBoundingClientRect();
    const rect2 = el2.getBoundingClientRect();
  
    const horizontalOverlap = rect1.left < rect2.right && rect1.right > rect2.left;
    const verticalOverlap   = rect1.top < rect2.bottom && rect1.bottom > rect2.top;
  
    return horizontalOverlap && verticalOverlap;
}

function downsampleUint8Array(uint8arr, targetCount)
{
    if (uint8arr.length <= targetCount || targetCount < 3)
    {
        throw new Error("Array must be longer than targetCount and targetCount must be at least 3.");
    }
  
    const result = [uint8arr[0]];
    const middleCount = targetCount - 2;
    const chunkSize = (uint8arr.length - 2) / middleCount;
  
    for (let i = 0; i < middleCount; i++)
    {
        let start = Math.floor(1 + i * chunkSize);
        let end = Math.floor(1 + (i + 1) * chunkSize);
        const chunk = uint8arr.slice(start, end);
    
        const avg = chunk.reduce((a, b) => a + b, 0) / chunk.length;
        result.push(Math.round(avg));
    }
  
    result.push(uint8arr[uint8arr.length - 1]);
    return new Uint8Array(result);
}

class daNode
{
    constructor()
    {
        this.element = null; // html element
        this.parent = null; // daNode
        this.children = []; // [daNode]
        this.debug = false; // bool

        this.createElementWithClass = function(tagName, className)
        {
            this.element = document.createElement(tagName);
            this.element.classList.add(className);
            return this.element;
        }

        this.appendNodeToElement = function(node)
        {
            this.element.appendChild(node.element);
            this.children.push(node);
            node.parent = this;
            if (this.debug) node.setDebugMode(true);
            return node;
        }

        this.appendNodeToNode = function(parent, child)
        {
            parent.element.appendChild(child.element);
            parent.children.push(child);
            child.parent = parent;
            if (parent.debug) child.setDebugMode(true);
            return child;
        }

        this.removeNodeFromElement = function(node)
        {
            this.element.removeChild(node.element);
            let index = this.children.indexOf(node);
            if (index != -1)
            {
                this.children.splice(index, 1);
            }
            return null;
        }

        this.setDebugMode = function(isDebug)
        {
            if (isDebug)
            {
                this.debug = true;
                this.element.classList.add("debug");
                for (const child of this.children)
                {
                    child.setDebugMode(true);
                }
            }
            else
            {
                this.debug = false;
                this.element.classList.remove("debug");
                for (const child of this.children)
                {
                    child.setDebugMode(false);
                }
            }
        }
    }
}

class BeatTimer extends daNode
{
    // sweeping circle timer for song thing thing and other things apparently ??
    constructor()
    {
        super();

        this.createElementWithClass("div", "beatTimerDiv");

        this.sweepingCircle = document.createElement("canvas");
        this.sweepingCircle.classList.add("sweepingCircle");
        this.element.appendChild(this.sweepingCircle);
        this.sweepingCircleCtx = this.sweepingCircle.getContext("2d");
        this.lastSweepingCircleNumber = null;

        this.endSweepingCircle = function()
        {
            cancelAnimationFrame(this.lastSweepingCircleNumber);
            this.sweepingCircleCtx.clearRect(0, 0, this.sweepingCircle.width, this.sweepingCircle.height);
        }

        this.restartSweepingCircle = function(bpm, bpl)
        {
            this.endSweepingCircle();
            this.lastSweepingCircleNumber = requestAnimationFrame((t) => this.continueSweepingCircle(new Date(), 0, bpm, bpl));
        }

        this.continueSweepingCircle = function(start, ms, bpm, bpl)
        {
            this.lastSweepingCircleNumber = requestAnimationFrame((t) => this.continueSweepingCircle(start, new Date() - start, bpm, bpl));
            this.sweepingCircleCtx.clearRect(0, 0, this.sweepingCircle.width, this.sweepingCircle.height);
          
            let _angleOffset = -0.5 * Math.PI;
            let _angle = (ms/((60/bpm) * 1000 * bpl)) * 2 * Math.PI;
          
            this.sweepingCircleCtx.beginPath();
            this.sweepingCircleCtx.arc(this.sweepingCircle.width/2, this.sweepingCircle.height/2, this.sweepingCircle.width/6, _angleOffset, _angleOffset + _angle);
            this.sweepingCircleCtx.strokeStyle = daSong.accentColor;
            this.sweepingCircleCtx.lineWidth = 16;
            this.sweepingCircleCtx.stroke();
        }
    }
}

class Title extends daNode
{
    // the title up there
    constructor(text)
    {
        super();

        this.createElementWithClass("h1", "title");
        this.element.textContent = text;
    }
}

class PauseButton extends daNode
{
    // self explanitory
    constructor()
    {
        super();

        this.createElementWithClass("img", "pauseButton");
        this.element.src = "../img/pause.svg";
        const self = this;

        this.element.addEventListener("click", function()
        {
            daSong.pauseMusic(!daSong.isPaused);

            if (daSong.isPaused) self.element.src = "../img/play.svg";
            else self.element.src = "../img/pause.svg";
        })
    }
}

class Navbar extends daNode
{
    // the navbar has the metronome and pause button
    constructor(titleText)
    {
        super();

        this.createElementWithClass("div", "navbar");

        this.titleText = this.appendNodeToElement(new Title(titleText));
        // this.titleText = this.appendNodeToElement(new PauseButton());
        this.beatTimer = this.appendNodeToElement(new BeatTimer());
    }
}

class TrackButton extends daNode
{
    // the trackbutton controls monster tracks
    constructor(trackId)
    {
        super();

        this.trackId = trackId;

        this.createElementWithClass("div", "trackButton");
        this.element.style.backgroundColor = daSong.accentColor;

        this.trackNumberText = document.createElement("p");
        this.trackNumberText.textContent = trackId + 1;
        this.element.appendChild(this.trackNumberText);

        const self = this; // kill me

        this.updateMonsterTrack = function()
        {
            if (!self.element.classList.contains("selected"))
            {
                self.parent.parent.track = self.trackId;
                self.parent.parent.beatTimer.endSweepingCircle();
                if (daSong.beatInterval) self.parent.parent.beatTimer.continueSweepingCircle(daSong.lastLoopStart, new Date() - daSong.lastLoopStart, daSong.bpm, daSong.bpl);

                for (const daButton of self.parent.trackButtons)
                {
                    daButton.element.classList.remove("selected");
                }
                self.element.classList.add("selected");
            }
        }

        this.element.addEventListener("click", this.updateMonsterTrack);
    }
}

class TracksDiv extends daNode
{
    // the tracksdiv holds the trackbuttons
    constructor()
    {
        super();

        this.trackButtons = [];

        this.createElementWithClass("div", "tracksDiv");

        this.createTrackButtons = function(count)
        {
            for (const daButton of this.trackButtons)
            {
                this.removeNodeFromElement(daButton);
            }

            this.trackButtons = [];

            for (let i = 0; i < count; i++)
            {
                const daButton = this.appendNodeToElement(new TrackButton(i));
                this.trackButtons.push(daButton);

                if (i == 0) daButton.updateMonsterTrack();
            }
        }
    }
}

class MonsterSprite extends daNode
{
    // the sprite of the monster
    constructor()
    {
        super();

        this.createElementWithClass("div", "monsterSprite");
    }
}

class MonsterButton extends daNode
{
    // mute button, etc
    constructor()
    {
        super();

        this.createElementWithClass("img", "monsterButton");
    }
}

class MonsterButtonsDiv extends daNode
{
    // holds the mute button, etc
    constructor()
    {
        super();

        this.createElementWithClass("div", "monsterButtonsDiv");
    }
}

class AudioVisualizer extends daNode
{
    // the funky line above the monsters
    constructor()
    {
        super();

        this.currentFile = "";
        this.lastAnimNumber = null;

        this.createElementWithClass("canvas", "audioVisualizer");

        const self = this;

        this.setCurrentFile = function(filename)
        {
            this.currentFile = filename;

            if (filename == "")
            {
                cancelAnimationFrame(this.lastAnimNumber);
                this.lastAnimNumber = null;
            }
            else
            {
                cancelAnimationFrame(this.lastAnimNumber);
                this.setupVisualizer(filename);
            }
        }

        this.setupVisualizer = function(fileUrl)
        {
            if (fileUrl == "") return;
            const analyser = fileAnalyserNodes.get(fileUrl);
            if (!analyser)
            {
                setTimeout(function() { self.setupVisualizer(fileUrl) }, 0.1); // check again fuckass
                return;
            }

            const ctx = this.element.getContext("2d");
            const dataArray = downsampleUint8Array(new Uint8Array(analyser.frequencyBinCount), 8);
        
            this.draw = function()
            {
                self.lastAnimNumber = requestAnimationFrame(self.draw);
        
                analyser.getByteFrequencyData(dataArray);
        
                ctx.clearRect(0, 0, self.element.width, self.element.height);
                const barWidth = self.element.width / dataArray.length;
        
                for (let i = 0; i < dataArray.length; i++)
                {
                    const barHeight = dataArray[i] / 255 * self.element.height;
                    const x = i * barWidth;
        
                    ctx.fillStyle = daSong.accentColor;
                    ctx.fillRect(x, self.element.height - barHeight, barWidth + 1, barHeight);
                }
            }
        
            this.draw();
        }
    }
}

class Monster extends daNode
{
    // the individual actual mimicbots
    constructor(monsterId)
    {
        super();

        this.monsterId = monsterId;
        this.eggId = -1;
        this.eggIdPrev = -1;
        this.track = 0;
        this.maxTracks = 0;
        this.monsterData = null;

        this.heightOffset = 0;
        this.hOffMin = 20;
        this.hOffMax = 40;

        this.currentlyPlaying = null;
        this.muted = false;
        this.solo = false;

        this.createElementWithClass("div", "monster");

        this.sprite = this.appendNodeToElement(new MonsterSprite());

        this.portrait = document.createElement("img");
        this.sprite.element.appendChild(this.portrait);

        this.audioVisualizer = new AudioVisualizer();
        this.sprite.element.appendChild(this.audioVisualizer.element);

        this.tracksDiv = this.appendNodeToElement(new TracksDiv());
        this.beatTimer = this.appendNodeToElement(new BeatTimer());

        this.monsterButtonsDiv = this.appendNodeToElement(new MonsterButtonsDiv());
        this.muteButton = this.appendNodeToNode(this.monsterButtonsDiv, new MonsterButton()); // mutes monster
        this.muteButton.element.src = "../img/mute.svg";
        this.soloButton = this.appendNodeToNode(this.monsterButtonsDiv, new MonsterButton()); // solos monster
        this.soloButton.element.src = "../img/solo.svg";
        this.downButton = this.appendNodeToNode(this.monsterButtonsDiv, new MonsterButton()); // removes monster without stopping tracks
        this.downButton.element.src = "../img/down.svg";
        this.cancButton = this.appendNodeToNode(this.monsterButtonsDiv, new MonsterButton()); // removes monster and stops track
        this.cancButton.element.src = "../img/cancel.svg";

        const self = this;

        this.setEggId = function(newId, cancelAudio = false)
        {
            this.eggIdPrev = this.eggId;
            this.eggId = newId;
            this.track = 0;

            if (cancelAudio && this.currentlyPlaying)
            {
                stopAudio(this.currentlyPlaying);
            }
            
            if (newId != -1)
            {
                const daEgg = daSong.stage.nursery.getEggById(newId);
                this.monsterData = daEgg.monsterData;
                this.maxTracks = daEgg.monsterData.tracks.length;
                this.portrait.src = this.monsterData.portrait;
                this.element.classList.add("hasEgg");
            }
            else
            {
                this.monsterData = null;
                this.maxTracks = 0;
                this.portrait.src = "";
                this.currentlyPlaying = "";
                this.element.classList.remove("hasEgg");
            }

            this.setMuted(false);
            this.setSolo(false);
            this.tracksDiv.createTrackButtons(this.maxTracks);

            document.dispatchEvent(monsterUpdated);
        }

        this.setNewHeightOffset = function()
        {
            this.heightOffset = this.hOffMin + Math.random() * (this.hOffMax - this.hOffMin);

            this.sprite.element.style.marginTop = `${this.heightOffset}%`;
            this.sprite.element.style.marginBottom = `-${this.heightOffset}%`;
            this.tracksDiv.element.style.marginTop = `calc(-${this.heightOffset}% - 175%)`;
        }

        this.setSoundState = function()
        {
            if (this.muted || daSong.soloEra != this.solo || this.eggId == -1)
            {
                muteAudio(this.currentlyPlaying);
                this.element.classList.remove("highlight");
            }
            else
            {
                unmuteAudio(this.currentlyPlaying);
                this.element.classList.add("highlight");
            }
        }

        this.setMuted = function(newMuted)
        {
            if (newMuted)
            {
                this.muted = true;
                this.muteButton.element.classList.add("selected");
            }
            else
            {
                this.muted = false;
                this.muteButton.element.classList.remove("selected");
            }
            this.setSoundState();
        }
        this.muteButton.element.addEventListener("click", () => { this.setMuted(!this.muted) });

        this.setSolo = function(newSolo)
        {
            if (newSolo)
            {
                this.solo = true;
                this.soloButton.element.classList.add("selected");
                this.setMuted(false);
            }
            else
            {
                this.solo = false;
                this.soloButton.element.classList.remove("selected");
            }

            daSong.figureSoloEra();
            for (const monster of daSong.stage.island.monsters)
            {
                monster.setSoundState();
            }
        }
        this.soloButton.element.addEventListener("click", () => { this.setSolo(!this.solo) });

        this.downMonster = function()
        {
            if (this.eggId == -1) return;
            daSong.stage.nursery.getEggById(self.eggId).setDisabled(false);
            self.setEggId(-1);
            self.beatTimer.endSweepingCircle();
        }
        this.downButton.element.addEventListener("click", this.downMonster);

        this.cancelMonster = function()
        {
            if (this.eggId == -1) return;
            daSong.stage.nursery.getEggById(self.eggId).setDisabled(false);
            self.beatTimer.endSweepingCircle();
            self.setEggId(-1, true);
            self.beatTimer.endSweepingCircle();
            self.setNewHeightOffset();
        }
        this.cancButton.element.addEventListener("click", this.cancelMonster);

        this.setNewHeightOffset();
    }
}

class MonsterHolder extends daNode
{
    // the monsterholder holds the eggs
    constructor()
    {
        super();

        this.createElementWithClass("div", "monsterHolder");
    }
}

class Island extends daNode
{
    // the island contains the monsterholder which contains the monsters
    constructor(monsterCount)
    {
        super();

        this.monsters = [];
        this.monsterCount = monsterCount;

        this.createElementWithClass("div", "island");

        this.monsterHolder = this.appendNodeToElement(new MonsterHolder());

        for (let i = 0; i < monsterCount; i++)
        {
            const daMonster = this.appendNodeToNode(this.monsterHolder, new Monster(i));
            this.monsters.push(daMonster);
        }
    }
}

class Egg extends daNode
{
    // the things the player drags onto the monsters
    constructor(eggId, monsterData)
    {
        super();

        this.monsterData = monsterData;

        this.setId = function(newId)
        {
            this.eggId = newId;
        }

        this.setDisabled = function(newDis)
        {
            this.disabled = newDis;

            if (this.disabled)
            {
                this.element.classList.add("disabled");
            }
            else
            {
                this.element.classList.remove("disabled");
            }
        }

        this.createElementWithClass("div", "egg");

        this.setId(eggId);
        this.setDisabled(false);

        this.debugText = document.createElement("p");
        this.debugText.textContent = eggId;
        this.element.appendChild(this.debugText);

        this.portrait = document.createElement("img");
        this.portrait.src = this.monsterData.portrait;
        this.element.appendChild(this.portrait);

        const self = this;
    }
}

class MouseEgg extends Egg
{
    // egg turns into mouseegg when being dragged
    constructor(eggId, monsterData)
    {
        super(eggId, monsterData);

        this.element.classList.add("mouseEgg");
    }
}

class EggHolder extends daNode
{
    // the eggholder holds the eggs
    constructor()
    {
        super();

        this.createElementWithClass("div", "eggHolder");
    }
}

class Nursery extends daNode
{
    // the nursery holds the eggholder and manages the eggs
    constructor(monsterData)
    {
        super();

        this.eggCount = monsterData.length;
        this.eggs = [];

        this.createElementWithClass("div", "nursery");

        this.eggHolder = this.appendNodeToElement(new EggHolder());
        this.mouseEgg = [];

        const self = this;

        for (let i = 0; i < this.eggCount; i++)
        {
            const daEgg = this.appendNodeToNode(this.eggHolder, new Egg(i, monsterData[i]));
            this.eggs.push(daEgg);

            daEgg.element.addEventListener("mousedown", function()
            {
                if (!daEgg.disabled)
                {
                    self.mouseEgg.push(self.appendNodeToNode(self.eggHolder, new MouseEgg(daEgg.eggId, self.getEggById(daEgg.eggId).monsterData)));
                    daEgg.setDisabled(true);
                }
            });

            daEgg.element.addEventListener("touchstart", function()
            {
                if (!daEgg.disabled)
                {
                    self.mouseEgg.push(self.appendNodeToNode(self.eggHolder, new MouseEgg(daEgg.eggId, self.getEggById(daEgg.eggId).monsterData)));
                    daEgg.setDisabled(true);
                }
            });
        }

        this.getEggById = function(eggId)
        {
            for (let i = 0; i < this.eggCount; i++)
            {
                if (this.eggs[i].eggId == eggId) return this.eggs[i];
            }
            return null;
        }
    }
}

class Stage extends daNode
{
    // the stage holds the navbar, the island, and the nursery
    constructor(titleText, monsterData, monsterCount)
    {
        super();

        this.createElementWithClass("div", "stage");
        this.element.classList.add("prePlay");

        this.navbar = this.appendNodeToElement(new Navbar(titleText));
        this.island = this.appendNodeToElement(new Island(monsterCount));
        this.nursery = this.appendNodeToElement(new Nursery(monsterData));
    }
}

class PlsLandscape extends daNode
{
    // portrait mode is illegal
    constructor()
    {
        super();

        this.createElementWithClass("div", "plsLandscape");

        this.flavorText = document.createElement("h2");
        this.flavorText.textContent = "Landscape only, please rotate your device";
        this.element.appendChild(this.flavorText);
    }
}

class PlayScreen extends daNode
{
    // play screen before msmincredibox
    // REQUIRED because browsers require user input before audio playback
    // this also gives everything time to load haha
    constructor(playScreenText)
    {
        super();

        this.createElementWithClass("div", "playScreen");
        this.element.classList.add("prePlay");

        this.playScreenText = document.createElement("h1");
        this.playScreenText.textContent = playScreenText;
        this.element.appendChild(this.playScreenText);

        this.playScreenButton = document.createElement("img");
        this.playScreenButton.src = "../img/play.svg";
        this.element.appendChild(this.playScreenButton);

        this.playScreenButton.addEventListener("click", function(){ daSong.beginGame() });
    }
}

export class MonsterData
{
    constructor(name, tracks, portrait)
    {
        this.name = name;
        this.tracks = tracks;
        this.portrait = "./img/" + portrait;
    }
}

export class Song extends daNode
{
    constructor(titleText, bpm, bpl, bmod, accentColor, accentText, monsterData)
    {
        super();

        this.bpm = bpm; // beats per minute
        this.bpl = bpl; // beats per loop
        this.bmodulo = bmod; // loops until true loop
        this.bmcounter = -1;
        this.accentColor = accentColor;
        this.accentText = accentText;

        this.eggCount = monsterData.length;
        this.monsterCount = 8;

        this.createElementWithClass("div", "songDiv");

        this.stage = this.appendNodeToElement(new Stage(titleText, monsterData, this.monsterCount));
        this.plsLandscape = this.appendNodeToElement(new PlsLandscape());
        this.playScreen = this.appendNodeToElement(new PlayScreen("MSM Incredibox: " + titleText));

        this.beatInterval = null;
        this.lastLoopStart = new Date();
        this.controllingHighlight = false;
        this.isPaused = false;
        this.pauseTime = 0;
        this.canPause = false;
        this.startDelay = 500; // before loop begins

        this.element.style.color = this.accentText;

        const self = this;
        daSong = self;
        const allAudioFiles = [];

        for (const monster of monsterData)
        {
            for (const track of monster.tracks)
            {
                for (const filename of track)
                {
                    if (filename != "")
                    {
                        allAudioFiles.push("./audio/" + filename);
                    }
                }
            }
        }

        preloadAllAudio(allAudioFiles);

        this.beginGame = function()
        {
            this.stage.element.classList.remove("prePlay");
            this.playScreen.element.classList.remove("prePlay");
        }

        this.soloEra = false;
        this.figureSoloEra = function()
        {
            this.soloEra = this.stage.island.monsters.filter((monster) => monster.solo).length > 0;
        }

        this.pauseMusic = function(newPause)
        {
            if (!this.canPause) return;
            if (newPause)
            {
                this.isPaused = true;
                pauseAllAudio();
                this.pauseTime = new Date() - this.lastLoopStart;
                clearTimeout(this.beatInterval);
            }
            else
            {
                this.isPaused = false;
                resumeAllAudio();
                this.lastLoopStart = new Date() - this.pauseTime;
                this.beatInterval = setTimeout(function()
                {
                    daSong.beatIntervalFunction();
                }, (60/self.bpm) * 1000 * self.bpl - this.pauseTime)
            }
        }

        this.beatIntervalFunction = function()
        {
            this.bmcounter++;
            if (this.bmcounter == this.bmodulo) this.bmcounter = 0;

            // determine which files need to be played
            let tracksToPlay = [];
            for (const monster of this.stage.island.monsters)
            {
                if (monster.monsterData == null) continue;

                monster.beatTimer.endSweepingCircle();
                if (monster.monsterData.tracks[monster.track].length > this.bmcounter)
                {
                    const daTrack = monster.monsterData.tracks[monster.track][this.bmcounter];
                    if (daTrack != "")
                    {
                        const daFullTrack = "./audio/" + daTrack;
                        tracksToPlay.push(daFullTrack);
                        if (monster.currentlyPlaying && monster.eggId != monster.eggIdPrev)
                        {
                            for (const track of monster.monsterData.tracks)
                            {
                                for (const filename of track)
                                {
                                    stopAudio("./audio/" + filename);
                                }
                            }
                            stopAudio(monster.currentlyPlaying);
                        }
                        monster.eggIdPrev = monster.eggId;
                        monster.currentlyPlaying = daFullTrack;
                        monster.audioVisualizer.setCurrentFile(daFullTrack);
                        monster.setSoundState();
                    }
                }
            }

            playFilesInSync(tracksToPlay)
            .then(function()
            {
                self.lastLoopStart = new Date();

                self.stage.navbar.beatTimer.restartSweepingCircle(self.bpm, self.bpl);

                self.beatInterval = setTimeout(function()
                {
                    daSong.beatIntervalFunction((60/self.bpm) * 1000 * self.bpl);
                }, (60/self.bpm) * 1000 * self.bpl);
            });
        }

        this.startBeatInterval = function()
        {
            setTimeout(function()
            {
                self.canPause = true;
                self.beatIntervalFunction();
            }, this.startDelay);
        }

        this.cancelBeatInterval = function()
        {
            this.bmcounter = -1;
            this.canPause = false;
            clearTimeout(this.beatInterval);
            this.beatInterval = null;
            this.stage.navbar.beatTimer.endSweepingCircle();
            stopAllAudio(); // super failsafe
        }

        document.addEventListener("monsterUpdated", (e) =>
        {
            const activeMonsterCount = this.stage.island.monsters.filter((monster) => monster.eggId != -1).length;
            
            if (activeMonsterCount == 0) this.cancelBeatInterval();
            else if (this.beatInterval == null) this.startBeatInterval();
        });

        document.addEventListener("keydown", (e) =>
        {
            if (e.key === "Backspace" && !e.repeat)
            {
                for (const mouseEgg of this.stage.nursery.mouseEgg)
                {
                    this.stage.nursery.eggHolder.removeNodeFromElement(mouseEgg);
                }
                this.stage.nursery.mouseEgg = [];

                for (const monster of this.stage.island.monsters)
                {
                    monster.cancelMonster();
                }

                for (const egg of this.stage.nursery.eggs)
                {
                    egg.setDisabled(false);
                }
            }
        });

        this.preMouseMoveEvent = function()
        {
            const monsters = this.stage.island.monsters;
            for (const monster of monsters)
            {
                monster.element.classList.remove("highlight");
            }
        }

        this.mouseMoveEvent = function(e, mouseEggIndex = 0)
        {
            if (this.stage.nursery.mouseEgg[mouseEggIndex])
            {
                const mouseEgg = this.stage.nursery.mouseEgg[mouseEggIndex];
                this.controllingHighlight = true;
                mouseEgg.element.style.left = `calc(${e.clientX}px - (60% / 20))`;
                mouseEgg.element.style.top = `calc(${e.clientY}px - (60% / 20))`;

                const monsters = this.stage.island.monsters;
                const closestMonster = getClosestNodeToMouse(monsters, e.clientX, e.clientY);
                const theyTouching = areBoundingBoxesOverlapping(closestMonster, mouseEgg);

                if (theyTouching) closestMonster.element.classList.add("highlight");
            }
        }

        document.addEventListener("mousemove", (e) =>
        {
            if (this.stage.nursery.mouseEgg.length > 0)
            {
                self.preMouseMoveEvent();
                self.mouseMoveEvent(e);
            }
        });

        document.addEventListener("touchmove", (e) =>
        {
            if (this.stage.nursery.mouseEgg.length > 0)
            {
                this.preMouseMoveEvent();
                for (let i = 0; i < e.changedTouches.length; i++)
                {
                    const touch = e.changedTouches[i];
                    const touchEvent = {};
                    touchEvent.clientX = touch.clientX;
                    touchEvent.clientY = touch.clientY;
                    self.mouseMoveEvent(touchEvent, i);
                }
            }
        });

        this.mouseUpEvent = function(e, mouseEggIndex = 0)
        {
            if (this.stage.nursery.mouseEgg[mouseEggIndex])
            {
                const mouseEgg = this.stage.nursery.mouseEgg[mouseEggIndex];
                this.controllingHighlight = false;
                const monsters = this.stage.island.monsters;
                const closestMonster = getClosestNodeToMouse(monsters, e.clientX, e.clientY);
                const theyTouching = areBoundingBoxesOverlapping(closestMonster, mouseEgg);

                for (const monster of monsters)
                {
                    monster.element.classList.remove("highlight");
                    monster.setSoundState();
                }

                if (theyTouching)
                {
                    if (closestMonster.eggId != -1)
                    {
                        this.stage.nursery.getEggById(closestMonster.eggId).setDisabled(false);
                    }
                    closestMonster.setEggId(mouseEgg.eggId);
                    this.stage.nursery.getEggById(mouseEgg.eggId).setDisabled(true);
                }
                else
                {
                    this.stage.nursery.getEggById(mouseEgg.eggId).setDisabled(false);
                }

                this.stage.nursery.mouseEgg = this.stage.nursery.mouseEgg.filter((egg) => egg != mouseEgg);
                this.stage.nursery.eggHolder.removeNodeFromElement(mouseEgg);
            }
        }

        document.addEventListener("mouseup", (e) =>
        {
            if (this.stage.nursery.mouseEgg.length > 0)
            {
                self.mouseUpEvent(e);
            }
        });

        document.addEventListener("touchend", (e) =>
        {
            if (this.stage.nursery.mouseEgg.length > 0)
            {
                for (let i = 0; i < e.changedTouches.length; i++)
                {
                    const touch = e.changedTouches[i];
                    const touchEvent = {};
                    touchEvent.clientX = touch.clientX;
                    touchEvent.clientY = touch.clientY;
                    self.mouseUpEvent(touchEvent, i);
                }
            }
        });
    }
}

document.addEventListener("contextmenu", event =>
{
    event.preventDefault();
});

function setVhUnit()
{
    const vh = window.innerHeight * 0.01;
    document.body.style.setProperty('--vh', `${vh}px`);
}
  
window.addEventListener('resize', setVhUnit);
window.addEventListener('orientationchange', setVhUnit);
window.addEventListener('load', setVhUnit);
setVhUnit();
