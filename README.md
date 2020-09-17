# What is this?
Create a modal dialog

# Instalation

`npm i naehasdialog  --save`

Then.........


```
import {modaldialog } from 'naehasdialog';

createModalDialog("#taskDialog",null, 'New Task', "", {"Task Title": 'text', "Subject" : 'textarea'}, 
{"Task Title":['stitle','New Task'], "Subject":['subject','testing']}, {"saveId":'Save'});



```

## Options
There are many options but dialogId is required param, all others are optional

* *dialogId* - the id of the dialog, is a string passing like "#taskDialog" and a required field
* *formObj* - {formName: "sendEmailForm", action: "/smarttask/saveMeta", method: "POST"}; //optional field you can pass as null

* *title* - dialog header text //required

* *subTitle* - description of the dialog //optional, you can pass empty string ""

* *labelAndElmType* - is an object, key: "label text", value: "input type", example: {"Assignee" : "select", "Subject": 'text'} //required if dialog has input fields

* *fieldsValue* - is an complex object, key: "label text", value: [ inputName, inputValue, requiredField, className,"checked"(if checkbox) or "hasGroupOption", "extraOptions" (for select box)]

    Example:
        "Assignee": ['taskAssignee', OptionsValue, false, 'task-assignee', true, extraOptions ] and example of

        * *OptionsValue* = [{KEY:'U3', VALUE:"Priti Mondol"},{KEY:'U2', VALUE:"Anika Gangly"}, {KEY:'U4', VALUE:"Yuuki Ota"}];

        * *extraOptions* =['<option value="LoggedInUser">Logged In User</option>', '<option value="taskCreator">Task Creator</option>']

* *buttons* - is a object, key:"buttonId", value: 'button label'  example: {"sendEmailId": "Confirm"};

* *hasDatatable* - is a boolean value to indicate whether the dialog contains a dataTable
* *No need to pass cancel button*
  

