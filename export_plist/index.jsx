var export_plist = function (data, path) {
  var plist = new XML('<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE plist SYSTEM "file://localhost/System/Library/DTDs/PropertyList.dtd"><plist version="1.0"><dict></dict></plist>')
  // <?xml version="1.0" encoding="UTF-8"?>
  // <!DOCTYPE plist SYSTEM "file://localhost/System/Library/DTDs/PropertyList.dtd">
  // <plist version="1.0">
  // <dict>
  //     <key>Author</key>
  //     <string>William Shakespeare</string>
  //     <key>Lines</key>
  //     <array>
  //         <string>It is a tale told by an idiot,</string>
  //         <string>Full of sound and fury, signifying nothing.</string>
  //     </array>
  //     <key>Birthdate</key>
  //     <integer>1564</integer>
  // </dict>
  // </plist>

  var dict = plist.xpath('//dict');
  var list = "";
  var file;
  
  // array | data | date | dict | real | integer | string | true | false
  function wrap_val (val) {
    var wrap, _wrap;
    switch(val.constructor.name) {
      case "Number": 
        if (Math.ceil(val) == val) {
          wrap = "<integer>";_wrap = "</integer>";
        }
        else {
          wrap = "<real>";_wrap = "</real>";
        };
        break;
      case "String": 
        wrap = "<string>";_wrap = "</string>";
        break;
      case "Boolean": 
        wrap = "<"; _wrap = " />";
        break;
      default: ; break;
    }
    return (wrap + val + _wrap);
  }
  
  for (var i in data) {
    if (data[i].constructor.name == "Array") {
      list += ("<key>" + i + "</key>");
      list += ("<array>");
      
      for (var j=0, len=data[i].length; j < len ; j++) {
        list += wrap_val(data[i][j]);
      };
      
      list += ("</array>");
    }
    else {
      list += ("<key>" + i + "</key>");
      list += wrap_val(data[i]);
    }
  };

  // $.writeln(list);
  dict.appendChild( new XMLList(list) );

  file = new File(path);
  if (file.open("w")) {
    file.encoding = "utf-8";
    file.write(plist.toXMLString());
    file.close();
    return true
  };
}
