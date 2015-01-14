// Chaz K. Biroan
// Coder Camps
// 11200 Broadway St
// Suite 2731
// Pearland, TX 77584
//
// Week One (1) Quiz App

// Description: This app generates five questions, records user responses, compares responses, and displays results

/* Non-function globals */
(function test () {
    var objQuestionArr = [];
    var answered = [];

    var questionsArr = [
        "Approximately, how often does Old Faithul erupt?",
        "Which of the following is an experimental methodology to find geothermal hot spots anywhere on Earth?",
        "According to Hans A Bethe, are stellar protium-protium nucleosynthesis processes highly dependent on temperature?",
        "Which of the following is a temperature dependent stellar nucleosynthetic process?",
        "Indicate which of the following are involved in β+ during protium-protium nucleostynthesis.",
        "The Old Faithful Snowlodge was built in what year?",
        "What is the most common isotope of the most common element in the universe? Please use proper capitalization.",
        "What proper term describes the ability for a particle to go through a barrier that would not be classically possible?"
    ];

    var choicesArr = [
        ["Every hour, ± 15 minutues",
         "Every 91 minutes, ± 10 minutes",
         "Every 10 minutes, ± 12 minutes",
         "Every 2 hours, ± 30 minutes"],
        ["Use a crystal spring within a vacuum tube to empirically calculate gravitational acceleration, then compare that calculation to its theoretical calculation. If its empirical value is at least 20 galileos faster than its theoretical value, then there is a hot spot.",
         "Use sound waves to return crust thickness. If the return reveals 10 miles thick or less, then there is a hot spot.",
         "Examine the geological features under the soil. If there is rhyolite present, then there is a hot spot.",
         "Examine the geographical features. If there is no signs of plant life, then there is a hot spot."],
        ["Yes", "No"],
        ["Carbon-Nitrogen-Oxygen cycle (CNO cycle)",
         "Protium-protium nucleosynthesis",
         "Permutation cycles in Bose-Einstein condensation of a trapped ideal gas",
         "The Lorentz effect"],
        ["Positron",
         "Neutrino",
         "Electron",
         "Antineutrino"],
         [""],
         [""],
         [""]
    ];

    var choiceValueArr = [
        ["hour", "min91", "min10", "hour2"],
        ["crystalSpring", "soundWaves", "geol", "geop"],
        ["Yes", "No"],
        ["CNO", "pp", "perm", "Lorentz"],
        [" Positron", " Neutrino", " Electron", " Antineutrino"],
        "",
        "",
        ""
    ];

    var expandedAnswers = [
    "Every 91 minutes, ± 10 minutes",
    "Use a crystal spring within a vacuum tube to empirically calculate gravitational acceleration, then compare that calculation to its theoretical calculation. If its empirical value is at least 20 galileos faster than its theoretical value, then there is a hot spot.",
    "No",
    "Carbon-Nitrogen-Oxygen cycle (CNO cycle)",
    "Positron, Neutrino",
    "1997",
    "Protium",
    "Quantum tunnelling"
    ];

    var answersArr = [
        "min91",
        "crystalSpring",
        "No",
        "CNO",
        [" Positron", " Neutrino"],
        "1997",
        "Protium",
        "Quantum tunnelling"
    ];

    var styleArr = [
        "radio",
        "radio",
        "radio",
        "radio",
        "checkbox",
        "text",
        "text",
        "text"
    ];


    var userRadio;
    var userCheck = [];
    var userText;

    var wrong = 0;
    var right = 0;
    var norep = 0;

    var responses = [];

    var increment = 0;

    var startTime;
    var stopTime;
    /* End non-function globals */

    /* jQuery */
    $("#startBtn").click(function () {
        var target = document.getElementById("test");

        var removeThis = document.getElementById("startBtn");
        removeThis.remove();

        var build = document.createElement("input");

        build.setAttribute("type", "button");
        build.setAttribute("id", "nextBtn");
        build.setAttribute("class", "btn btn-info");
        build.setAttribute("value", "Next");

        target.appendChild(build);

        startTime = Date.now();
        display();
    });

    $(document).on("click", "#nextBtn", function () {
        compare(increment);
        empty();
        display();
        console.log("number right: " + right);
    });

    $(document).on("click", "#submitBtn", function () {
        var target = document.getElementById("test");
        var removeBtn = document.getElementById("submitBtn");
        removeBtn.remove();

        var build = document.createElement("input");
        build.setAttribute("type", "button");
        build.setAttribute("id", "doneBtn");
        build.setAttribute("class", "btn btn-warning");
        build.setAttribute("value", "Done");

        target.appendChild(build);

        compare(increment);
        console.log(responses);
        console.log(expandedAnswers);
        console.log(right);
        console.log(wrong);
        console.log(norep);
        empty();
        stopTime = Date.now();
        displayResults();        
    });

    $(document).on("click", "#doneBtn", function () {
        var target1 = document.getElementById("question");
        var target2 = document.getElementById("choices");
        var target3 = document.getElementById("proBar");

        wrong = 0;
        right = 0;
        norep = 0;

        location.reload();
    });

    $(document).on("click", ".radio", function () {
        userRadio = this.value;
    });

    $(document).on("click", ".checkbox", function () {
        if (this.checked) {
            userCheck.push(this.value);
        }
        else {
            var target = userCheck.indexOf(this.value);
            userCheck.splice(target, 1);
        }
    });

    $(document).on("change", "#text", function () {
        userText = this.value;
        console.log(userText);
    });
    /* End jQuery */

    /* JS functions*/
    // Quiz and quiz display
    var ObjQuestion = function (question, choices, answer, style, value, choiceVal, expandedAnswer) { // Object constructor for the questions 
        this.question = question;
        this.choices = choices;
        this.answer = answer;
        this.style = style;
        this.value = value;
        this.choiceVal = choiceVal;
        this.expandedAnswer = expandedAnswer;
    }

    var buildObj = function () { // This function uses some global arrays and the object constructor to build each question, which is then stored to objQuestionArr
        for (var a = 0; a < questionsArr.length; a++) {
            var build = new ObjQuestion(questionsArr[a], choicesArr[a], answersArr[a], styleArr[a], "question" + a, choiceValueArr[a], expandedAnswers[a]);
            objQuestionArr.push(build);
        }
        console.log(objQuestionArr);
    }

    var infoScreen = function () { // This function builds the info scren
        var target1 = document.getElementById("choices");
        target1.innerHTML = "You are about to commence the quiz. Once the quiz begins, you will notice that there is no button to return to a previous question. This was an intentional design choice. Therefore, think carefully; and spell, punctuate, and capitalize correctly before submitting an answer and proceeding to another question."
    }

    var display = function () { // This function generates a random number to pick a question and displays the question to the screen
        var random = Math.floor(Math.random() * objQuestionArr.length);

        if (objQuestionArr.length > 0) {
            var targetQuestion = document.getElementById("question");
            var targetChoices = document.getElementById("choices");
            var proBar = document.getElementById("proBar");

            var buildTab = document.createElement("table");
            var buildBod = document.createElement("tbody");
            var progress = document.createElement("div");

            progress.setAttribute("class", "progress-bar progress-bar-info");
            progress.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            progress.setAttribute("id", "proBar" + increment);

            targetChoices.innerHTML = '';
            targetQuestion.innerHTML = objQuestionArr[random].question;
            progress.innerHTML = increment + 1;

            for (var a = 0; a < objQuestionArr[random].choices.length; a++) {
                var getInp = objQuestionArr[random].style;

                var buildInp = document.createElement("input");
                var buildLab = document.createElement("label");
                var buildInpTd = document.createElement("td");
                var buildLabTd = document.createElement("td");
                var buildTr = document.createElement("tr");

                if (getInp === "text") {
                    buildInp.setAttribute("type", getInp);
                    buildInp.setAttribute("id", getInp)
                    buildInp.setAttribute("class", "form-control");
                    buildInpTd.appendChild(buildInp);
                    buildTr.appendChild(buildInpTd);
                    buildBod.appendChild(buildTr);
                }
                else {
                    buildInp.setAttribute("type", getInp);
                    buildInp.setAttribute("name", "choice");
                    buildInp.setAttribute("value", objQuestionArr[random].choiceVal[a]);
                    buildInp.setAttribute("class", getInp);
                    buildLab.setAttribute("id", objQuestionArr[random].choiceVal[a]);

                    buildLab.innerHTML = objQuestionArr[random].choices[a];

                    buildInpTd.appendChild(buildInp);
                    buildLabTd.appendChild(buildLab);
                    buildTr.appendChild(buildInpTd);
                    buildTr.appendChild(buildLabTd);

                    buildBod.appendChild(buildTr);
                }
            }
            buildTab.appendChild(buildBod);
            targetChoices.appendChild(buildTab);
            proBar.appendChild(progress);

            var pushThis = objQuestionArr.splice(random, 1)[0];
            answered.push(pushThis);
        }

        if (increment === (questionsArr.length - 1)) {
            var target = document.getElementById("test");
            var removeBtn = document.getElementById("nextBtn");
            removeBtn.remove();

            var submitBtn = document.createElement("input");
            submitBtn.setAttribute("type", "button");
            submitBtn.setAttribute("id", "submitBtn");
            submitBtn.setAttribute("class", "btn btn-success");
            submitBtn.setAttribute("value", "Submit");

            target.appendChild(submitBtn);
        }
    }

    var compare = function (number) { // Launches the comparisons by first checking which global variable is not empty or undefined.
        if (userCheck.length > 0) {
            console.log("check");
            responses.push(userCheck);
            compareCheck(number);
        }
        else if (typeof userRadio !== 'undefined') {
            console.log("radio");
            var targetIndex = answered[increment].choiceVal.indexOf(userRadio);
            var pushThisTarget = answered[increment].choices[targetIndex];
            responses.push(pushThisTarget);
            compareRadio(number);
        }
        else if (typeof userText !== 'undefined') {
            console.log("text");
            responses.push(userText);
            compareText(number);
        }
        else {
            var changeUn = document.getElementById("proBar" + increment);
            changeUn.setAttribute("class", "progress-bar progress-bar-warning");
            changeUn.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            responses.push('');
            norep++;
            wrong++;
        }
    }

    var compareCheck = function (number) { // Input type: checkbox. Compares at least one user response.
        user = userCheck.sort();
        answer = answered[number].answer.sort();
        var change = document.getElementById("proBar" + increment);
        if (user.length !== answer.length) {
            change.setAttribute("class", "progress-bar progress-bar-danger ");
            change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            wrong++;
        }
        else {
            for (var a = 0; a < answer.length; a++) {
                if (user[a] !== answer[a]) {
                    change.setAttribute("class", "progress-bar progress-bar-danger ");
                    change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
                    wrong++;
                    return;
                }                
            }
            change.setAttribute("class", "progress-bar progress-bar-success ");
            change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            right++;
        }
    }

    var compareRadio = function (number) { // Input type: radio. Compares a single user response.
        console.log(number);
        var change = document.getElementById("proBar" + increment);
        if (userRadio == answered[number].answer) {
            change.setAttribute("class", "progress-bar progress-bar-success ");
            change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            right++;
        }
        else {
            change.setAttribute("class", "progress-bar progress-bar-danger ");
            change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            wrong++;
        }
    }

    var compareText = function (number) { // Input type: text. Compares a single response.
        var change = document.getElementById("proBar" + increment);
        if (userText === answered[number].answer) {
            change.setAttribute("class", "progress-bar progress-bar-success ");
            change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            right++;
        }
        else {
            change.setAttribute("class", "progress-bar progress-bar-danger ");
            change.setAttribute("style", "width: " + ((1 / questionsArr.length) * 100) + "%");
            wrong++;
        }
    }

    var empty = function () { // Resests global user responses to either empty or undefined
        userCheck = [];
        userRadio = undefined;
        userText = undefined;
        increment++;
    }
    // End quiz and quiz display

    // Results and results display
    var displayResults = function () { // Displays a table of user respones vs correct answers
        document.getElementById("question").innerHTML = '';
        var target = document.getElementById("choices");
        target.innerHTML = '';

        var buildTab = document.createElement("table");
        var buildHea = document.createElement("thead");
        var buildBod = document.createElement("tbody");

        buildTab.setAttribute("class", "table table-striped");

        for (var c = 0; c < 3; c++) {
            var buildHTr = document.createElement("tr");
            if (c === 0) {
                var buildTop = document.createElement("th");
                buildTop.setAttribute("id", "quizResult");
                buildTop.innerHTML = "Quiz Results";
                buildHTr.appendChild(buildTop);
                buildHea.appendChild(buildHTr);
            }
            else if (c === 1) {
                var buildGrade = document.createElement("th");
                buildGrade.innerHTML = ((((right) / (questionsArr.length)) * 100) + "%");
                buildHTr.appendChild(buildGrade);
                buildHea.appendChild(buildHTr);
            }
            else {
                var buildQue = document.createElement("th");
                var buildHUR = document.createElement("th");
                var buildHCR = document.createElement("th");
                buildQue.innerHTML = "Question";
                buildHUR.innerHTML = "Your Response";
                buildHCR.innerHTML = "Correct Answer";
                buildHTr.appendChild(buildQue);
                buildHTr.appendChild(buildHUR);
                buildHTr.appendChild(buildHCR);
                buildHea.appendChild(buildHTr);
            }
            
        }

        for (var a = 0; a < expandedAnswers.length; a++) {
            var buildTr = document.createElement("tr");
            var buildUserTd = document.createElement("td");
            var buildCorrTd = document.createElement("td");
            var buildQuesTd = document.createElement("td");

            buildUserTd.setAttribute("class", "display");
            buildCorrTd.setAttribute("class", "display");
            buildQuesTd.setAttribute("class", "display");

            if ((typeof responses[a] === 'object') && typeof responses[a].length !== 'undefined') {
                for (var b = 0; b < responses[a].length; b++) {
                    var buildUp = document.createElement("p");
                    var buildCp = document.createElement("p");

                    buildUp.innerHTML = responses[a][b];
                    buildUserTd.appendChild(buildUp);
                    buildCorrTd.appendChild(buildCp);
                }
                buildTr.appendChild(buildUserTd);
                buildTr.appendChild(buildCorrTd);
            }
            buildQuesTd.innerHTML = (a + 1) + ") " + answered[a].question;
            buildUserTd.innerHTML = responses[a];
            buildCorrTd.innerHTML = answered[a].expandedAnswer;
            buildTr.appendChild(buildQuesTd);
            buildTr.appendChild(buildUserTd);
            buildTr.appendChild(buildCorrTd);
            buildBod.appendChild(buildTr);
        }
        buildTab.appendChild(buildHea);
        buildTab.appendChild(buildBod);
        target.appendChild(buildTab);
    }
    // End results and results display
    /* End JS functions */

    /* On load JS functions */
    buildObj();
    infoScreen();
    /* End on load JS functions*/
})();