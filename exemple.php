<html>
<head>
<style>
#character_justify {
    position: relative;
    width: 40%;
    border: 1px solid red;
    font-size: 32pt;
    margin: 0;
    padding: 0;
}
#character_justify * {
    margin: 0;
    padding: 0;
    border: none;
}
</style>
<script>
function SplitText(node)
{
    var text = node.nodeValue.replace(/^\s*|\s(?=\s)|\s*$/g, "");

    for(var i = 0; i < text.length; i++)
    {
        var letter = document.createElement("span");
        letter.style.display = "inline-block";
        letter.style.position = "absolute";
        letter.appendChild(document.createTextNode(text.charAt(i)));
        node.parentNode.insertBefore(letter, node);

        var positionRatio = i / (text.length - 1);
        var textWidth = letter.clientWidth;

        var indent = 100 * positionRatio;
        var offset = -textWidth * positionRatio;
        letter.style.left = indent + "%";
        letter.style.marginLeft = offset + "px";

        //console.log("Letter ", text[i], ", Index ", i, ", Width ", textWidth, ", Indent ", indent, ", Offset ", offset);
    }

    node.parentNode.removeChild(node);
}

function Justify()
{
    var TEXT_NODE = 3;
    var elem = document.getElementById("character_justify");
    elem = elem.firstChild;

    while(elem)
    {
        var nextElem = elem.nextSibling;

        if(elem.nodeType == TEXT_NODE)
            SplitText(elem);

        elem = nextElem;
    }
}

</script>
</head>
<body onload="Justify()">
<p id="character_justify">
Something<br/>
Like<br/>
This
</p>
</body>
