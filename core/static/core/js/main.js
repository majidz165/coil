$(document).ready(function () {
  // code here
  $('input,textarea,select').addClass('w-full border-2 border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent');
  $('textarea').attr('rows', '3');


  // $(".pdate-picker").pDatepicker({
  //   "format": "L"
  // })
  // $(".pdate-picker").hide()
  // document.addEventListener("jdp:change", function (e) {
  //   console.log(e);
  //   console.log(e.target.value);
  //   const [year, month, day] = e.target.value.split("/")
  //   // const gdate = new JalaliDate(parseInt(year), parseInt(month), parseInt(day)).getGregorianDate()
  //   // console.log(gdate.getDate());
  //   // e.target.value = `${gdate.getDate()}/${gdate.getMonth()}/${gdate.getFullYear()}`
  // })
  // attr("data-jdp", "")

  // $('.pdate-picker').datepicker();

  jalaliDatepicker.startWatch();

  const modalBtns = document.querySelectorAll('.modal-toggle')
  if (modalBtns) {
    modalBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {

        const modal = document.querySelector(btn.getAttribute('data-modal'))
        modal.classList.toggle('hidden')

        // if data-acitivity id
        const acitivityId = btn.getAttribute('data-activity-id')
        if (acitivityId) {
          const acitivityInp = document.querySelector("#activity_id_refer_form")
          acitivityInp.value = acitivityId
        }

        const referForm = document.querySelector("#refer_form")
        if (referForm) {
          referForm.setAttribute("action", btn.getAttribute("data-action-url"))
        }


      })
    })
  }
  const modals = document.querySelectorAll('.modal')
  if (modals) {
    modals.forEach(function (modal) {
      modal.addEventListener('click', function (event) {
        const taget = event.target
        if (taget.classList.contains('modal')) {
          modal.classList.toggle('hidden')
        }
      })

    })
  }


  // end of document ready
});
