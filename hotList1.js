// Author: Chaz K. Biroan
// HotList, 1.0 
// Last updated: 17 Nov 2014 1336 hours 

/* JS modified methods */
// Arrays //
Array.prototype.removeFirst = function () { // Accesses Array and uses prototype to add the property RemoveFirst, then sets RemoveFirst to a function that can shift.
    this.shift();
}

Array.prototype.remove = function (index) { // Access Array and uses prototype to add the property remove, then sets remove to a function that can splice any element from an array, given a parameter called index.
    this.splice(index, 1);
}

Array.prototype.sortNum = function() {
    this.sort(function (a, b) {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
}

Array.prototype.sortObj = function(prop) {
    this.sort(function (a, b, prop) {
        if (typeof this[prop] === 'string') {
            a = a.prop.toUpperCase();
            b = b.prop.toUpperCase();
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
        else if (typeof this[prop] === 'number') {
            if (a < b) {
                return -1;
            }
            if (a > b) {
                return 1;
            }
            return 0;
        }
        else {
            console.log("please sort by either string or number")
        }
    });
}

Array.prototype.sortStr = function () {
    this.sort(function (a, b) {
        a = a.toUpperCase();
        b = b.toUpperCase();

        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
        return 0;
    });
}


// End arrays //

// Numbers // 
//Number.prototype.even = function () {
//    if ( % 2 === 0) {
//        console.log("this be even")
//    }
//    else {
//        console.log("this be odd");
//    }
//}
// End numbers

// Strings //
String.prototype.capOne = function (){
    var capStr = this.split(" ");
    var elem;
    var capt;
    var word;
	
    for(var a = 0; a < capStr.length; a++) {
        elem = capStr[a];
        capt = elem[0].toUpperCase();
        word = capt + elem.slice(1, elem.length);
    }
    return word;
}

String.prototype.capAll = function () { // Capitalizes the first word in every string
    var capstr = this.split(" ");
    var upcase = [];

    for (var a = 0; a < capstr.length; a++) {
        upcase.push(capstr[a].capOne());
    }
    return upcase.join(" ");
}

String.prototype.titleCase = function () {
    var noncaps = ["a", "aboard", "about", "above", "absent", "across", "after", "against", "along", "alongside", "amid", "amidst", "among", "amongst", "an", "and", "around", "as", "aslant", "astride", "at", "athwart", "atop", "barring", "before", "behind", "below", "beneath", "beside", "between", "beyond", "but", "by", "despite", "down", "during", "except",
                   "failing", "following", "for", "from", "in", "inside", "into", "like", "mid", "minus", "near", "next", "nor", "notwithstanding", "of", "off", "on", "onto", "opposite", "or", "out", "outside", "over" ,"past", "per", "plus", "regarding", "round", "save", "since", "so", "than", "the", "through", "throughout", "till", "times", "to", "toward",
				   "towards", "under", "underneath", "unlike", "until", "up", "upon", "via", "vs", "vs.", "when", "with", "within", "without", "worth", "yet"];
    var capTitle = this.split(" ");
    var newTitle = [];
    	
    for (var a = 0; a < capTitle.length; a ++) {
        var elem = capTitle[a];
        if((a === 0) || (a === (capTitle.length - 1))){
            newTitle.push(elem.capOne());
        }
        else {
            for (var b = 0; b < noncaps.length; b++) {
                if (elem === noncaps[b]) {
                    newTitle.push(elem);
                    break;
                }
                else if (b === (noncaps.length - 1)){
                    newTitle.push(elem.capOne());
                }
            }
        }
    }    
    return newTitle.join(" ");
}
// End strings
/* End JS modified methods */