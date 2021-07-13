# quiz-facilitator
A node script that get all the questions and/or options asked in a google or microsoft form.
Helpful in cheating in exams.

> **_NOTE:_** &nbsp; Make sure that the links to the forms that you use are open and not locked to certain organisation.

#### Current Situation
Not actively developing this. I had made this as a helper script for my exams and successfully used it.

## Basic Setup Steps
1. Download code files
2. Make sure you have node installed in you laptop
3. In terminal change the working directory to the downloaded folder.
3. run `yarn` to download all dependencies

## Working with Google Form
1. Make sure in terminal you are in this codes directory.
    For Mac - `cd <pathToThisCodesDirectory>`
2. Running a script `node getGF.js <parameter1> <parameter2>` 
3. Parameters
    | Parameter no      | value             | example and explanation |
    | -----------       | -----------       | -----------             |
    | 1                 | link to the form  | eg. https://forms.gle/yYprqf6r6dHxfG2g8 |
    | 2                 | `Q` or `QwO`      | `Q` is used for getting all the questions <br/> `QwO` is used for getting all questions along with answer| 
    
    eg. `node getGF.js https://forms.gle/yYprqf6r6dHxfG2g8 Q` 


## Working with Microsoft Form
> **_NOTE:_** &nbsp; Works much like google forms, make sure that the microsoft form link is open and not limited to a certain organisation as i havent tested that sccenario out.
1. Make sure in terminal you are in this codes directory.
    For Mac - `cd <pathToThisCodesDirectory>`
2. Running a script `node getGF.js <parameter1> <parameter2>` 
3. Parameters
    | Parameter no      | value             | example and explanation |
    | -----------       | -----------       | -----------             |
    | 1                 | link to the form  | eg. https://forms.office.com/Pages/ResponsePage.aspx?id=SEPx0bXxCUqsmX6_ITy8ga3_Z9XVSDZBrlkGj2ihlnlUQ0lQQlZSTDVOQ0tMT1lCMEVNSDlRSVpIQS4u |
    | 2                 | `Q` or `QwO`      | `Q` is used for getting all the questions <br/> `QwO` is used for getting all questions along with answer| 
    
    eg. `node getGF.js https://forms.office.com/Pages/ResponsePage.aspx?id=SEPx0bXxCUqsmX6_ITy8ga3_Z9XVSDZBrlkGj2ihlnlUQ0lQQlZSTDVOQ0tMT1lCMEVNSDlRSVpIQS4u QwO` 

## Future Scopes and improvement
- [ ] Enable getting links to images wherever there are images as question
- [ ] In Microsoft form getting all the Qs and Options when using `node getMF examplelink.com QwO ` and not just the question and options visible in the firstt section
- [ ] Figure out a way to bypass organisations restrictions in microsoft forms
- [ ] Use a webdrivers to autofill random answers and submit with a random email id, with the small chance that in google forms you get the answer sheet with correct responses after submmission. This answer sheet could be converted to pdf using puppetter exported. 
- [ ] Provide direct google search links with the question as the search query, assuming that the person who is using it, his ideal next step would be to go and look up google for answers.
- [ ] In a distant fututre having an opensource website where all students can collaborate anonymously to help each other pass exams using a voting based system to the answers.