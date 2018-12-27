To run the process on your system:

* Change the Create File input plugin with your desired Inplut plugin such as Folder Capture, HTTP Server Input..etc
* Get the value of the Hexadecimal string with the Set Job Infos and Variables. A script might be needed if the hex value is a result of some intermediate processing.
* Set the value of the image format. Supported formats are bmp, gif, jpg, pcx, png, tga, tiff
* If you do change the names of the local variables **%{signature}** and **%{imgFormat}**, make sure to edit the script with the corresponding variable names in the following lines

```javascript
var signature = hexToBase64(Watch.GetVariable("signature"));
var mimeType = "image/" + Watch.GetVariable("imgFormat");

// supported formats: bmp, gif, jpg, pcx, png, tga, tiff

base64ToBinary(signature, Watch.GetJobFilename(), mimeType);
```
