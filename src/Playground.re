[@bs.module "./Playground.html"] external html: unit = "default";
html;


[@bs.send.pipe: array('a)] external map: ('a => 'b) => array('b) = "";
[@bs.send.pipe: array('a)] external filter: ('a => bool) => array('a) = "";

let myArray: array(int) = [|1,2,3,4,5|];

let intToBool = (x: int) => {
  switch(x) {
    | 0 => false
    | _ => true
  }
};

let doubleArr = myArray
  |> map(x => x * 3)
  |> filter(x => intToBool(x mod 2));

Js.log(doubleArr);
