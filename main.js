(()=>{"use strict";function e(e,t){e.classList.add(t.inactiveButtonClass),e.setAttribute("disabled",!0)}function t(t,n,o){!function(e){return e.every((function(e){return!0===e.validity.valid}))}(t)?e(o,n):(o.classList.remove(n.inactiveButtonClass),o.removeAttribute("disabled",!1))}var n=function(e){"Escape"===e.key&&r(document.querySelector(".popup_opened"))};function o(e){e.classList.add("popup_opened"),document.addEventListener("keyup",n)}function r(e){e.classList.remove("popup_opened"),document.removeEventListener("keyup",n)}var c={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},u={baseUrl:"https://nomoreparties.co/v1/plus-cohort-2",headers:{authorization:"44636783-74cb-4589-8742-e9314e17f901","Content-Type":"application/json"}},a=document.querySelector(".popup__link-name"),i=document.querySelector("#open-image"),s=i.querySelector(".popup__image"),l=document.querySelector(".popup__underline"),d=document.querySelector("#delete-card"),p=document.querySelector(".popup__confirm-button");function f(e){e.target.classList.contains("element__group")&&(e.target.classList.contains("element__group_active")?function(e){var t,n=e.currentTarget.querySelector(".my-image"),o=e.currentTarget.querySelector(".my-like");(t=n.id,fetch("".concat(u.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){o.textContent=e.likes.length})).catch((function(e){console.log(e)}))}(e):function(e){var t,n=e.currentTarget.querySelector(".my-image"),o=e.currentTarget.querySelector(".my-like");(t=n.id,fetch("".concat(u.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){o.textContent=e.likes.length})).catch((function(e){console.log(e)}))}(e))}function m(e){e.target.classList.contains("element__group")&&e.target.classList.toggle("element__group_active")}function _(e,t){var n=function(e){var t=document.querySelector("#card").content.querySelector(".element").cloneNode(!0),n=t.querySelector(".element__image");n.setAttribute("src",e.link),n.setAttribute("alt",e.name),n.setAttribute("id",e._id),t.querySelector(".element__title").textContent=e.name;var c,a=t.querySelector(".element__likes"),_=t.querySelector(".element__group");c=_,e.likes.forEach((function(e){"796f13e264ff2e7b6cb3cdf1"===e._id&&c.classList.add("element__group_active")})),a.textContent=e.likes.length,t.addEventListener("click",m),t.addEventListener("click",f),t.setAttribute("id",e._id);var v=t.querySelector(".element__delete");return v.setAttribute("id",e._id),v.addEventListener("click",(function(){!function(e,t){p.setAttribute("id",e),o(d),p.addEventListener("click",(function(e){var n;n=e.target.id,fetch("".concat(u.baseUrl,"/cards/").concat(n),{method:"DELETE",headers:u.headers}),t.id===e.target.id&&(t.remove(),r(d))}))}(t.id,t)})),function(e,t){"796f13e264ff2e7b6cb3cdf1"!==e.owner._id&&t.classList.add("element__delete_disactive")}(e,v),n.addEventListener("click",(function(){o(i),s.setAttribute("src",e.link),s.setAttribute("alt",e.name),l.textContent=e.name})),t}(e);e.link===a.value?t.prepend(n):t.append(n)}var v,y=document.querySelector(".profile__edit-button"),h=document.querySelector(".profile__add-button"),S=document.querySelector("#edit-popup"),b=document.querySelector("#create-popup"),q=document.querySelectorAll(".popup"),g=document.querySelector(".popup__user-info"),k=document.querySelector(".popup__place-info"),L=document.querySelector(".popup__user-name"),E=document.querySelector(".profile__name"),C=document.querySelector(".profile__work-place"),A=document.querySelector(".popup__user-work"),x=document.querySelector(".popup__place-name"),j=document.querySelector(".elements").querySelector(".elements__gallery"),T=document.querySelector("#create-button"),P=document.querySelector("#link-for-avatar"),U=document.querySelector(".profile__avatar"),D=document.querySelector(".profile__avatar-conteiner"),B=document.querySelector(".popup__link-info"),N=document.querySelector(".popup__avatar-link"),O=document.querySelector(".popup__save-button"),w=document.querySelector(".popup__link-post-button");function J(e,t){t.textContent=e?"Сохранение...":"Сохранить"}B.addEventListener("submit",(function(e){var t;e.preventDefault(),J(!0,w),(t=N.value,fetch("".concat(u.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:u.headers,body:JSON.stringify({avatar:t})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){U.setAttribute("src",e.avatar)})).catch((function(e){console.log(e)})).finally((function(){J(!1,w)})),r(P)})),y.addEventListener("click",(function(){L.value=E.textContent,A.value=C.textContent,o(S)})),h.addEventListener("click",(function(){o(b),e(T,c)})),D.addEventListener("click",(function(){o(P)})),g.addEventListener("submit",(function(e){var t,n;e.preventDefault(),J(!0,O),(t=L,n=A,fetch("".concat(u.baseUrl,"/users/me"),{method:"PATCH",headers:u.headers,body:JSON.stringify({name:t.value,about:n.value})})).then((function(e){console.log(e)})).catch((function(e){console.log(e)})).finally((function(){J(!1,O)})),E.textContent=L.value,C.textContent=A.value,r(S)})),k.addEventListener("submit",(function(e){var t,n;e.preventDefault(),J(!0,T),(t=x,n=a,fetch("".concat(u.baseUrl,"/cards"),{method:"POST",headers:u.headers,body:JSON.stringify({name:t.value,link:n.value})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(e){_(e,j)})).catch((function(e){console.log(e)})).finally((function(){J(!1,T),k.reset()})),r(b)})),fetch("".concat(u.baseUrl,"/users/me"),{headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){U.setAttribute("src",e.avatar),E.textContent=e.name,C.textContent=e.about})).catch((function(e){console.log(e)})),fetch("".concat(u.baseUrl,"/cards"),{headers:u.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})).then((function(e){e.forEach((function(e){_(e,j)}))})).catch((function(e){console.log(e)})),q.forEach((function(e){e.addEventListener("click",(function(e){(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&r(e.currentTarget)}))})),v=c,Array.from(document.querySelectorAll(v.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,n){var o=Array.from(n.querySelectorAll(e.inputSelector)),r=n.querySelector(e.submitButtonSelector);t(o,e,r),o.forEach((function(c){var u=n.querySelector(".".concat(c.id,"-error"));c.addEventListener("input",(function(){t(o,e,r),function(e,t,n){t.validity.valid?function(e,t,n){t.classList.remove(e.inputErrorClass),n.textContent=""}(e,t,n):function(e,t,n){t.classList.add(e.inputErrorClass),n.textContent=t.validationMessage}(e,t,n)}(e,c,u)}))}))}(v,e)}))})();