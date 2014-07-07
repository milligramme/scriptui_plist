#include "./index.jsx"

var data = {};
data['dropdownlist1'] = [1,2,3];
data['listbox1']      = [1.33, 2.33, 3.22];
data['listbox2']      = [true,false,false,false];
data['edittext1']     = "Lorem ipsum dolor sit amet";
data['edittext2']     = "~/Desktop";
data['slider']        = 123.456;

export_plist(data, "~/Desktop/h.plist");

