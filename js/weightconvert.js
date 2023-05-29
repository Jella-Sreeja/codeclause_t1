function ValidateTemperatureCalculatorForm()
{
    _cmnRemoveAllErrorMessage();
    
    var inputTemperature = document.getElementById("inputTemperature").value;
    if(inputTemperature == "" || isNaN(inputTemperature) || Number(inputTemperature) <= 0)
    {
        _cmnShowErrorMessageBottomOfTheInputField("inputTemperature", "Enter valid temperature.");
        return false;
    }
    return true;
}

function ResetTemperatureCalculator()
{
    if(confirm("Are you sure want to reset the converter?")){
        document.getElementById("inputTemperature").value = "";
        document.getElementById("toUnit").value = "Gram";
        document.getElementById("fromUnit").value = "Kilogram";
        document.getElementById("outputTemperature").value = "";

        document.getElementById("temperatureResult").innerHTML = "";
        document.getElementById("temperatureFormula").innerHTML = "";
        
        _cmnRemoveAllErrorMessage();

        _cmnHideElement("OutputResult");
        _cmnShowElement("OutputInfo", "flex");
    }
}

function CalculateTemperature()
{
    if(ValidateTemperatureCalculatorForm())
    {
        var fromUnit = document.getElementById("fromUnit").value;
        var toUnit = document.getElementById("toUnit").value;
        var inputTemperature = document.getElementById("inputTemperature").value;
        var outputTemperature = document.getElementById("outputTemperature");
        
        ShowFormula(fromUnit, toUnit);
        
        var result = ConverterTemperature(inputTemperature,  fromUnit,  toUnit);
        
        outputTemperature.value = result.toFixed(2);
        document.getElementById("temperatureResult").innerHTML = formatResult(inputTemperature,result,fromUnit,toUnit);

        //result div show
        _cmnHideElement("OutputInfo");
        _cmnShowElement("OutputResult", "flex");
    }
}

function ConverterTemperature(inputTemperature,  fromUnit,  toUnit)
{
    fromUnit = fromUnit.toLowerCase();
    toUnit = toUnit.toLowerCase();
    inputTemperature = Number(inputTemperature);
    var outputTemperature;

    if (fromUnit == "Kilogram")
    {
        if (toUnit == "Gram")
        {
            outputTemperature = (inputTemperature*1000);
        }
       
    }
    else if (fromUnit == "Gram")
    {
        if (toUnit == "Kilogram")
        {
            outputTemperature = inputTemperature/1000;
        }
        
    }
   
    
    return outputTemperature;
}

function ShowFormula(fromUnit,toUnit)
{
    const formulaJSONobj = JSON.parse(formula);
    for(var i = 0; i <formulaJSONobj.conversions.length; i++)
    {            
        if(
            formulaJSONobj.conversions[i].from.toLowerCase() == fromUnit.toLowerCase() 
            && formulaJSONobj.conversions[i].to.toLowerCase() == toUnit.toLowerCase()
            )
        {
            document.getElementById("temperatureFormula").innerHTML = formulaJSONobj.conversions[i].formula;
        }
    }
}

function formatResult(inputTemperature,outputTemperature,fromUnit,toUnit){

    if(fromUnit.toLowerCase() == 'celsius'){
        fromUnit = '℃';
    }else if(fromUnit.toLowerCase() == 'kelvin'){
        fromUnit = 'K'
    }else if(fromUnit.toLowerCase() == 'fahrenheit'){
        fromUnit = '℉'
    }else if(fromUnit.toLowerCase() == 'rankine'){
        fromUnit = '°R'
    }

    if(toUnit.toLowerCase() == 'celsius'){
        toUnit = '℃';
    }else if(toUnit.toLowerCase() == 'kelvin'){
        toUnit = 'K'
    }else if(toUnit.toLowerCase() == 'fahrenheit'){
        toUnit = '℉'
    }else if(toUnit.toLowerCase() == 'rankine'){
        toUnit = '°R'
    }

    return inputTemperature + fromUnit + ' = ' + outputTemperature + toUnit;
}