[@bs.module "./Xhr.html"] external html: unit = "default";
html;

module XHR = {
  type xhr;
  
  [@bs.new] external make: unit => xhr = "XMLHttpRequest";
  
  [@bs.send] external open_: (
    xhr,
    ~method: [@bs.string] [
      | `GET
      | `POST
    ],
    ~url: string,
    ~async: bool
  ) =>
  unit = "open";
  [@bs.send] external send: xhr => unit = "";

};

let xhr = XHR.make();

XHR.open_(xhr, ~method=`GET, ~url="http://google.com", ~async=true);

XHR.send(xhr);

Js.log("text");

Js.log(xhr);
