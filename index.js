function createModalDialog(dialogId, formObj, title, subTitle, labelAndElmType, fieldsValue, buttons, hasDatatable) {
    $(dialogId).empty();

  let headerstr = '<div class="modal-dialog modal-w550"> <div class="modal-content"><div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span></button>';

  let modalTitle = '<h4 class="modal-title margin-top-10" id="myModalLabel">' + title  + '</h4>';

  let subHead = (typeof subTitle != "undefined") ?'<div class="left-align margin-top-10">' + subTitle + '</div>' : "";

  let modalBody =  '<div class="modal-body form-horizontal">';
  if(formObj != null){
    modalBody+= '<form name="' + formObj.formName + '" method="' + formObj.method +'" action="' + formObj.action + '" >';
  }

  let modalBodyElms = "",
    colorNames = [];

  if(typeof labelAndElmType != "undefined" && labelAndElmType!= "" && labelAndElmType != null) {
    for (let elm in labelAndElmType) {
      //find the element type
      let elmType = labelAndElmType[elm],
        fieldValue;

      //find the element's fieldsValue object
      if (fieldsValue != null) {
        fieldValue = fieldsValue[elm];
      }
      //normally datatable does not have any label, skip creating label for dataTable
      if(elmType == 'dataTable') {
        modalBodyElms += createDataTableHtml(fieldValue);
      }else if(elmType == 'iframe' ){
        modalBodyElms += createiFrameHtml(fieldValue);
      }else{
          modalBodyElms += createElmLabel(elm, fieldValue, hasDatatable);
      }
      if (typeof fieldValue != 'undefined' && fieldValue != null) {
        if (elmType == "multiSelect" || elmType == "select") {
          modalBodyElms += createElementForSelectBox(elmType, elm, fieldValue);
        } else if (elmType == "label") {
          let htmlStr = '<div class="col-sm-8"><span id="' + fieldValue[0] + '">' + fieldValue[1] + '</span> </div></div>';
          modalBodyElms += htmlStr;
        } else if (elmType == "textarea") {
          let htmlStr = '<div class="col-sm-8"><textarea name="' + fieldValue[0] + '" rows="1" class="form-control ' + fieldValue[3] + '" value="' + fieldValue[1] + '">' + fieldValue[1] + '</textarea> </div></div>';
          modalBodyElms += htmlStr;
        } else if (elmType == "text") {
          //create text box
          let htmlStr = '<div class="col-sm-8"><input type="text" name="' + fieldValue[0] + '"  class="form-control ' + fieldValue[3] + '" value="' + fieldValue[1] + '">' + '</input> </div></div>';
          modalBodyElms += htmlStr;
        } else if (elmType == 'checkbox') {
          let htmlStr = '<div class="col-sm-8"><input type="checkbox" id = "' + fieldValue[0] + '" name="' + fieldValue[0] + '"  class="' + fieldValue[3] + '" value="' + fieldValue[1] + '"';
          if (fieldValue[4] == "checked") {
            htmlStr += 'checked="' + fieldValue[4] + '"';
          }
          htmlStr += '></input> </div></div>';
          modalBodyElms += htmlStr;

        } else if (elmType == 'radio') {
          let htmlStr = '<div class="col-sm-8">';
          //TODO: create radio
          let radioHtml = createRadio(elm, fieldValue);

          htmlStr += radioHtml + '</input> </div></div>';
          modalBodyElms += htmlStr;
        } else if (elmType == 'radioWithSelect') {
          let htmlStr = '<div class="col-sm-8">';
          let radioHtml = createRadioWithSelect(elmType, elm, fieldValue);
          htmlStr += radioHtml + '</input> </div></div>';
          modalBodyElms += htmlStr;
        } else if (elmType == "Date") {
          let htmlStr = '<div class="col-sm-8"><input type="text" id="' + fieldValue[0] + '" name="' + fieldValue[0] +
            '"  class="date-field form-control ' + fieldValue[1] + '" value="' + fieldValue[1] + '">' + '</input> </div></div>';
          modalBodyElms += htmlStr;
        } else if (elmType == "colorPicker") {
          let htmlStr, colorFieldName = fieldValue[0],
            defaultColor = fieldValue[1], isRequired = fieldValue[2],
            colorPaletteOptions = fieldValue[3];
          if (fieldValue[3] != null) {
            htmlStr = '<div class="col-sm-8 margin-bottom-5">' +
              '<input type="hidden" id="' + colorFieldName + '" name="' + colorFieldName + '" data-palette=\'' + colorPaletteOptions +
              '\' value="' + defaultColor + '"/></div>';
          } else {
            htmlStr = '<div class="col-sm-8 margin-bottom-5">' +
              '<input type="hidden" id="' + colorFieldName + '" name="' + colorFieldName + '" data-palette=\'[{"#97040c": "#97040c"},{"#fc0d1b": "#fc0d1b"},{"#fc3986": "#fc3986"},{"#fd9bcb": "#fd9bcb"},' +
              '{"#fd8182": "#fd8182"},{"#0633b0": "#0633b0"},{"#82acfc": "#82acfc"}, {"#6bcdfd": "#6bcdfd"}, {"#86fefd":"#86fefd"}, {"#cccdfd": "#cccdfd"}, {"#0c6564": "#0c6564"},' +
              '{"#0f7f12": "#0f7f12"}, {"#1bb287": "#1bb287"}, {"#29fd2e": "#29fd2e"}, {"#22cecd": "#22cecd"},{"#dafece": "#dafece"}, {"#b15916":"#b15916"}, {"#fd752d": "#fd752d"},' +
              '{"#fecb6e":"#fecb6e"}, {"#fffd3e": "#fffd3e"}, {"#000000":"#000000"},{"#a3a277": "#a3a277"}, {"#808080": "#808080"}, {"#bfbfbf":"#bfbfbf"}, {"#e6e6e6":"#e6e6e6"}]\'' +
              ' value="' + defaultColor + '"/></div>';
          }
          colorNames.push('"' + colorFieldName + '"');
          modalBodyElms += htmlStr;
        } else if (elmType == "dataTable") {
          //create basic html for dataTable
          console.log("dataTable");
        } else if (elmType == "iframe") {
          //create basic html for dataTable
          console.log("iframe");
        }
        else {
          modalBodyElms += '</div>';
          console.log("field value is not defined.")
        }
      } else {
        modalBodyElms += '</div>';
      }
    }
  }

  let htmlStr = headerstr + modalTitle  + subHead +'</div>'  + modalBody + modalBodyElms + '</div>';
  if(formObj != null) {
    htmlStr += '</form>';
  }
  htmlStr+=createModalFooter(buttons);

  //append htmlStr to parent modal dialog id
  $(dialogId).append(htmlStr);
  appConfig.makeChosen(".make-chosen");

  //make color picker
  colorNames.forEach(function(colorName){
    let name = '[name='+ colorName+']'
    $(name).paletteColorPicker({
      position: 'upside'
    });
  });

  //make modal dialog
  $(dialogId).modal({
    backdrop: "static"
  });

  if (hasDatatable) {
    $(".modal-content").css({'max-height': '750px', 'overflow-y': 'auto'});
  } else {
    $(".modal-content").css({'max-height': '750px'});
  }

  //make Message textarea wider
  $("textarea[name='Message']").attr("rows", 5);

  //add event handler for date field
  $(document).on("click", ".date-field", function (evt) {
    console.log("target:" + evt.currentTarget);
    $(".date-field").datepicker();
  });

} //end of createModalDialog

//create label html
const createElmLabel = (label, fieldValue, hasDatatable) => {
    let labelStr = '<div class="row margin-bottom-15 form-group"> ';
    if(hasDatatable){
      labelStr += '<label class="control-label col-sm-2">';
    }else {
      labelStr += '<label class="control-label col-sm-4">';
    }
    // if requiredField flag true
    if( typeof fieldValue != 'undefined' && fieldValue[2] == true){
      label+= ' <span class="red">*</span>';
    }
    return labelStr + label + '</label>';
  };

  //Create radio button html
const createRadio = (elm, fieldValue) => {
    let radioStr ='<div class="inputField ">';
    for(let robj in fieldValue[2]) {
      radioStr +=  '<span class="inputRadio margin-right-20"> <input type="radio" class="groupEnabled" name="' + elm + '" value="' +robj + '"';
  
      if (fieldValue[0] == robj) {
        radioStr += ' checked';
      }
      radioStr += '><span class="label smarttask radiolabel font-size-12">' + fieldValue[2][robj] +'</span></span>';
  
    }
    return radioStr+ '</div>';
  };
//create modal footer with buttons
const createModalFooter = (params) => {
    let modalFooter = '<div class="modal-footer"><button type="button" class="btn btn-primary btn-outline cancel" data-dismiss="modal">Cancel</button>';
      for(let button in params) {
        modalFooter += '<button type="button" class="btn btn-primary" id="' + button +'">' + params[button] + '</button>';
      }
    return modalFooter + '</div>';
  };

  module.exports.createModalDialog = naehasdialog;
