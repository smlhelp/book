function flip(idstub){
            if ($("#".concat(idstub).concat("-submenu")).is(":visible")) {
                $("#".concat(idstub).concat("-submenu")).hide(100);
                $("#".concat(idstub)).html("+")
            }
            else{
                $("#".concat(idstub).concat("-submenu")).show(100);
                $("#".concat(idstub)).html("-")
            }
        }
        $( document ).ready(function() {
            $(".submenu").hide();
            console.log("Hid submenus");
            $(".pluslink").html("+");
            $(".pluslink").on('click',function() {flip(this.id);});
        });

