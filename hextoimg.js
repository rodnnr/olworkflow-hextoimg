var signature = hexToBase64(Watch.GetVariable("signature"));
var mimeType = "image/" + Watch.GetVariable("imgFormat");

// supported formats: bmp, gif, jpg, pcx, png, tga, tiff


base64ToBinary(signature, Watch.GetJobFilename(), mimeType);

//convert base64 to image.
function base64ToBinary(base64String, filePath, mimeType) {
  var dom = new ActiveXObject('Microsoft.XMLDOM');
  var elem = dom.createElement('tmp');
  elem.dataType = 'bin.base64';
  base64String = base64String.replace("data:"+mimeType+";base64,", "");
  elem.text = base64String;
  var decodeBase64 = elem.nodeTypedValue

  var inputStream = new ActiveXObject('ADODB.Stream');
  inputStream.Open();
  inputStream.Type = 1;  // adTypeBinary
  inputStream.Write(decodeBase64);
  inputStream.SaveToFile(filePath, 2);
}


//convert hex to base64
function hexToBase64(str) {
    return btoa(String.fromCharCode.apply(null, str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")));
}


// Helper btoa() function

 function btoa(input) {
  var TABLE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  var REGEX_SPACE_CHARACTERS = /[\t\n\f\r ]/g;

    input = String(input);
    if (/[^\0-\xFF]/.test(input)) {
      Watch.Log('String contains characters outside of the Latin1 range.',2);
    }
    var padding = input.length % 3;
    var output = '';
    var position = -1;
    var a;
    var b;
    var c;
    var d;
    var buffer;

    var length = input.length - padding;

    while (++position < length) {

      a = input.charCodeAt(position) << 16;
      b = input.charCodeAt(++position) << 8;
      c = input.charCodeAt(++position);
      buffer = a + b + c;

      output += (
        TABLE.charAt(buffer >> 18 & 0x3F) +
        TABLE.charAt(buffer >> 12 & 0x3F) +
        TABLE.charAt(buffer >> 6 & 0x3F) +
        TABLE.charAt(buffer & 0x3F)
      );
    }

    if (padding == 2) {
      a = input.charCodeAt(position) << 8;
      b = input.charCodeAt(++position);
      buffer = a + b;
      output += (
        TABLE.charAt(buffer >> 10) +
        TABLE.charAt((buffer >> 4) & 0x3F) +
        TABLE.charAt((buffer << 2) & 0x3F) +
        '='
      );
    } else if (padding == 1) {
      buffer = input.charCodeAt(position);
      output += (
        TABLE.charAt(buffer >> 2) +
        TABLE.charAt((buffer << 4) & 0x3F) +
        '=='
      );
    }

    return output;
  }
