var import_plist = function (path) {
  var ret = {};

  var f = File(path);
  var str;
  if (f.open("r")) {
    str = f.read();
  }
  else {
    return ret
  }
  var xml = new XML(str);
  var dict = xml.dict;
  var last_key;
  for (var i=0, len=xml.dict.children().length(); i < len ; i++) {
    
    var node = xml.dict.children()[i];
    if (node.name() == 'key') {
      last_key = node.text();
      ret[node.text()];
    }
    else if (node.name() == 'array') {
      var ar = [];
      for (var ii = 0; ii < node.children().length(); ii++) {
        var text;
        if (node.children()[ii].name() == 'true') {
          text = true;
        }
        else if (node.children()[ii].name() == 'false') {
          text = false;
        }
        else {
          // TODO convert for integer, real
          text = node.children()[ii].text().toString();
        }
        ar.push(text);
      }
      ret[last_key] = ar;
    }
    else {
      var text;
      if (node.name() == 'true') {
        text = true;
      }
      else if (node.name() == 'false') {
        text = false;
      }
      else {
        // TODO convert for integer, real
        text = node.text().toString();
      }
      ret[last_key] = text;
    }
  };
  return ret
}

