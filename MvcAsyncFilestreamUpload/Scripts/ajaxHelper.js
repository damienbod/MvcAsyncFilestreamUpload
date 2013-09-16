
var initCallbackLoader = function (formId, loaderElement) {
    var $loaderElement = $(loaderElement);
    var $form = $('#' + formId + ' form');

    var loaderElementTimer;

    $loaderElement.hide();

    var formWidth = $form.width() + 10;
    var formHeight = $form.height() + 10;
    var containerTopMargin = (formHeight / 2) - 34;
    var containerLeftMargin = (formWidth / 2) - 42;

    $('.progress-container', $loaderElement).css({
        "margin-top": -5,
        "margin-left": -5,
        "width": formWidth,
        "height": formHeight
    });

    $('.progress-box', $loaderElement).css({
        "margin-top": containerTopMargin,
        "margin-left": containerLeftMargin
    });

    $form.submit(function () {
        loaderElementTimer = setTimeout(function () {
            $loaderElement.show();
        }, 200);
    });

    $form.ajaxStop(function () {
        $loaderElement.hide();
        clearTimeout(loaderElementTimer);
    });
}

var loadUrlContent = function (url, containerId, hideErrorMessage, successFunction) {
    $.ajax({
        type: "GET",
        url: url,
        cache: false,
        dataType: 'html',
        success: function (returnData, textStatus) {
            $('#' + containerId).empty().html(returnData);

            if (successFunction) {
                successFunction();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (!hideErrorMessage) {
                alert(textStatus + ': ' + errorThrown);
            }
        }
    });
}

var UploadDialog = function (targetPropertyName, targetPropertyText, dialogTitle, dialogId, buttons, uploadSuccessFn, widgetFormId) {
    this._targetPropertyName = targetPropertyName;
    this._targetPropertyText = targetPropertyText;
    this._dialogTitle = dialogTitle;
    this._dialogId = dialogId;
    this._buttons = buttons;
    this._uploadSuccess = uploadSuccessFn;
    this._widgetFormId = widgetFormId;

    this.initAjaxForm();
};

UploadDialog.prototype = {
    _targetPropertyName: "",
    _targetPropertyText: "",
    _dialogTitle: "",
    _dialogId: "",
    _buttons: {},
    _uploadSuccess: function () { },
    _widgetFormId: "",

    _fileUploadFormId: function () {
        return "#" + this._dialogId + "-form";
    },

    openDialog: function () {
        var instance = this;
        $('#' + this._dialogId).dialog({
            width: "600",
            height: "auto",
            position: "center",
            resizable: false,
            modal: true,
            title: this._dialogTitle,
            buttons: this._buttons,
            open: function () {
                var dialog = $('#' + instance._dialogId);
                $('#fieldToChange', dialog).val(instance._targetPropertyName);
                $('#filetype-label', dialog).html(instance._targetPropertyText);

                $.validator.unobtrusive.parse(instance._fileUploadFormId());
            },
            close: function () {
            }
        });
    },

    closeDialog: function () {
        var dialog = $('#' + this._dialogId);
        $('input[type=file]', dialog).val('');
        dialog.dialog('close');
    },

    initAjaxForm: function () {
        var formSelector = this._fileUploadFormId();
        var instance = this;
        $(formSelector).ajaxForm({
            target: formSelector,
            iframe: true,
            dataType: "json",
            beforeSubmit: function () { },
            success: function (result) {
                if (result.status == 'success') {
                    var widgetColorStatus = $('#' + instance._widgetFormId + ' .color-error');
                    widgetColorStatus.removeClass('color-error');
                    widgetColorStatus.addClass('color-finished');

                    if (instance._uploadSuccess) {
                        instance._uploadSuccess(result.newDownloadHref);
                    }
                } else {
                    alert(result.error);
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(textStatus);
                console.log(errorThrown);
            }
        });
    },

    submitFileUpload: function () {
        var form = $(this._fileUploadFormId());
        try {
            form.validate();

            if (form.valid()) {
                form.submit();
            }
        } catch (ex) {
            alert(ex);
        }

        return false;
    }

};