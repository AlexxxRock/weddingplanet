$(document).ready(function(){

    // FORMS
    const formMsgs = {
        errors: {
            default: {
                ru: 'Заполните поле',
                uk: "Заповніть поле",
                sk: 'Vyplňte pole',
                de: 'Füllen Sie das Feld aus'
            },
            name: {
                ru: 'Укажите имя',
                uk: "Вкажіть ім'я",
                sk: 'Zadajte názov',
                de: 'Geben Sie einen Namen ein'
            },
            phone: {
                ru: 'Укажите телефон',
                uk: "Вкажіть телефон",
                sk: 'Zadajte telefón',
                de: 'Geben Sie das Telefon ein'
            },
            policy_confirm: {
                ru: 'Дайте согласие',
                uk: "Дайте згоду",
                sk: 'Dajte súhlas',
                de: 'Einwilligung erteilen'
            },
            email: {
                ru: 'Укажите E-mail',
                uk: 'Вкажiть E-mail'
            },
            city: {
                ru: 'Укажите город',
                uk: 'Укажите город'
            }
        }
    }

    function isStr(formId, input, inputName) {
        var name = $('body').find(formId).find(input);
        $(name).on('change focusout keyup', function(){
            var nameVal = $(this).val();
            var regName = /[^\p{L}]+$/
            if(regName.test(nameVal)) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).next('.error-msg').text('');
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                if (formMsgs.errors[inputName] !== undefined) {
                    var msg = formMsgs.errors[inputName][lang]
                } else {
                    var msg = formMsgs.errors['default'][lang]
                }
                $('body').find(formId).find(this).next('.error-msg').text(msg);
            }
        })
    }
    
    function isCheck(formId, input, inputName) {
        var field = $('body').find(formId).find(input);
        $(field).on('change', function(){
            
            if($(this).prop('checked') === true) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).parents('.form-group').find('.error-msg').text('');
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                if (formMsgs.errors[inputName] !== undefined) {
                    var msg = formMsgs.errors[inputName][lang]
                } else {
                    var msg = formMsgs.errors['default'][lang]
                }
                $('body').find(formId).find(this).parents('.form-group').find('.error-msg').text(msg);
            }
        })
    }

    function isEmail(formId, input,inputName) {
        var name = $('body').find(formId).find('input[name=email]');
        $(name).on('change focusout keyup', function(){
            var nameVal = $(this).val();
            var regName = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
            if(regName.test(nameVal)) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).next('.error-msg').text('');
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                var msg = formMsgs.errors[inputName][lang]
                $('body').find(formId).find(this).next('.error-msg').text(msg);
            }
        })
    }

    function isPhone(formId, input, inputName) {
        var phone = $('body').find(formId).find(input);
        $(phone).on('change focusout keyup', function(){
            var phoneVal = $(this).val();
            var regPhone = /^\+?[0-9_. -()]+$/;
            var form = formId;

            if(regPhone.test(phoneVal) && phoneVal.length > 9 && phoneVal.length < 20) {
                $(this).addClass('not-error');
                $(this).removeClass('error-input');
                $(this).removeClass('empty-field');
                $(this).next('.error-msg').text('').hide();
            } else {
                $(this).removeClass('not-error');
                $(this).addClass('error-input');
                $(this).addClass('empty-field');
                var lang = $('html').attr('lang')
                var msg = formMsgs.errors[inputName][lang]
                $('body').find(formId).find(this).next('.error-msg').text(msg).show();
            }
        })
    }

    function send(formId, url, success, validateCount) {
        $('body').find(formId).on('submit', function(e){
            e.preventDefault();
            var form = $(this)
            var regProtect = /[^\p{L}]+$/;
            var protect = $(this).find('input[name=fullname]').val();
            
            if($(this).find('.not-error').length == validateCount && protect.length < 1) {
                var loader = `<div class="loader-layout fullpage">
                    <svg class="spinner spinner--circle" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" stroke-width="5" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                    </svg>
                </div>`

                $('body').append(loader)

                $('.toast').addClass('loaded')
                
                console.log('ok')

                $.ajax({
                    url: url,
                    type: 'post',
                    data: $(this).serialize(),

                    beforeSend: function(xhr, textStatus){
                        $(form).find(':input').attr('disabled','disabled');
                    },
                    success: function(response){
                        $(form).parents('.form-wrapper').find('.success-msg').fadeIn(150)
                        $(form).remove();
                    }
                })
            } else {
                $(this).find('.empty-field').each(function(){
                    var lang = $('html').attr('lang')
                    var name = $(this).attr('name')
                    var errorNode = $(this).parents('.form-group').find('.error-msg')
                    var msg = formMsgs.errors[name][lang]
                    $(errorNode).text(msg).show()
                })
                console.log('error')
                return false;
            }
        })
    }

    $('body').on('click', '.toast-close, .toast-confirm', function(e){
        e.preventDefault()

        $(this).parents('.toast').removeClass('loaded')
        setTimeout(function(){
            $(this).parents('.toast').remove()
        },1000)
    })

    isPhone('.feedback-form', 'input[name=phone]', 'phone')
    send('.feedback-form', '/send/', 0, 1)



})