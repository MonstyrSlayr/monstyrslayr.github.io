///@arg array
///@arg value

function find_value(searchThisArray,lookForThisValue)
{
	// 2. Check if value exists in array
	var arrayHasValue = false;
	for (var i = 0, iLen = array_length_1d(searchThisArray); i < iLen; i++)
	{
	   if (searchThisArray[i] == lookForThisValue)
	   {
	       arrayHasValue = true;
	       break;
	   }
	}

	// 3. Show true/false is value is found
	return arrayHasValue;
}