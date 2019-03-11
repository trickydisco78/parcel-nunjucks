var gigyaEventsInitialized = false;

function InitGigyaLogin(containerId, style, from) {
    if (!style) btnStyle = 'fullLogo';
    if (!from) {
        from = 'register'
    }

    gigya.socialize.showLoginUI({
        version: 2,
        context: from,
        width: 330,
        height: 100,
        containerID: containerId,
        buttonsStyle: style,
        UIConfig: '<config><body><controls><snbuttons buttonsize="35" /></controls></body></config>'
    });

    if (!gigyaEventsInitialized) {
        gigya.socialize.addEventHandlers({
            onLogin: onGigyaLoginHandler
        });
        gigyaEventsInitialized = true;
    }
}

function onGigyaLoginHandler(eventObj) {
    var credentials = {
        UID: eventObj.UID,
        UIDSignature: eventObj.UIDSignature,
        SignatureTimestamp: eventObj.signatureTimestamp,
        IsSiteUID: eventObj.isSiteUID,
        FirstName: eventObj.user.firstName,
        LastName: eventObj.user.lastName,
        BirthDay: eventObj.user.birthDay,
        BirthMonth: eventObj.user.birthMonth,
        BirthYear: eventObj.user.birthYear,
        Email: eventObj.user.email,
        CurrentPage: eventObj.context,
        Provider: eventObj.provider
    };

    $.ajax({
        showTermsLink: 'false',
        type: "POST",
        url: "/Api/GigyaVerifyAndAuthenticate/Post",
        data: JSON.stringify(credentials),
        dataType: 'json',
        contentType: 'application/json',
        success: handleAuthenticationResponse,
        error: handleError
    });
}

function handleAuthenticationResponse(response) {
    setTimeout(function () {
        if (response.IsError) {
            alert("Error: " + response.Message);
            window.location.href = "/";
        }
        else if (response.HasBeenLoggedIn) {
            window.location.href = "/";
        }
        else if (response.NeedsToBeLinked) {
            ShowLinkLogin(response);
        }
        else if (response.NeedsToBeRegistered) {
            RedirectToRegistration(response);
        }
    }, 1000);
}

function handleError() {
    alert('Error in Operation');
}

function ShowLinkLogin(response) {
    $('#LoginPopup').magnificPopup('close');
    $.magnificPopup.open({
        type: 'inline',
        prependTo: document.body.getElementsByTagName("form"),
        items: {
            src: '#LinkLoginPopup'
        }
    });

    $('#LinkLoginUID').attr('value', response.UID);
    $('#LinkLoginUIDSignature').attr('value', response.UIDSignature);
    $('#LinkLoginSignatureTimestamp').attr('value', response.SignatureTimestamp);
    $('#LinkLoginInternalId').attr('value', response.InternalId);
    $('#LinkLoginInternalSignature').attr('value', response.InternalSignature);
    $('#LinkLoginInternalTimestamp').attr('value', response.InternalTimestamp);
    $('#LinkLoginUserNameOrEmail').attr('value', response.Email);
}

function RedirectToRegistration(response) {
    var form = $('<form></form>');
    form.attr("method", "post");
    form.attr("action", "/" + response.CurrentPage);

    $.each(response, function (key, value) {
        var field = $('<input> </input>');
        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);
        form.append(field);
    });

    $(document.body).append(form);
    form.submit();
}

function HandleGigyaLogout() {
    jQuery.get('/api/Login/Logout', {}, function () {
        window.location.replace("/");
    });
}

gigya.socialize.addEventHandlers({
    onLogout: HandleGigyaLogout
});