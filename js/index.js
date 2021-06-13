document.addEventListener('DOMContentLoaded', init);


function init(){
    let totalCost = 0;
    let totalAmount = 0;

    const amount = document.getElementById('totalAmount');
    const cost = document.getElementById('totalCost');

    const orderButtons = document.querySelectorAll('.btn-check, .pop-up .close');
    const modal = document.querySelector('.pop-up');

    function handlePurchases() {
        const  buttons = document.querySelectorAll('.product-box__btn');

        buttons.forEach(button=>{
            button.addEventListener('click', ()=> buttonHandler(button))
        });

    }

    function buttonHandler(button) {
        const meta = button.closest('.product-box__item');
        const price = meta.dataset.price;

        let count = meta.querySelector('.qty__item').value || 1;

        totalAmount += +count;
        totalCost += (count * price);

        changeData(totalAmount, totalCost)
    }

    function changeData(a, c) {
        amount.innerHTML = a;
        cost.innerHTML = c;
    }

    function selectHandler() {
        const selectCategory = document.getElementById('category');
        const selectPrice = document.getElementById('price');
        const productItems = document.querySelectorAll('.product-box__item');
        let categoryValue, priceValue;

        selectCategory.onchange = function ({target:{value}}) {
            categoryValue = value;
            updateList()
        };

        selectPrice.onchange = function ({target:{value}}) {
            priceValue = value;
            updateList()
        };

        function updateList() {
            productItems.forEach(item=>{
                const price = +item.dataset.price;
                const category = +item.dataset.category;
                item.classList.remove('hidden');

                if (+categoryValue && category !== +categoryValue) {
                    item.classList.add('hidden');
                } else {
                    if (+priceValue && +priceValue < price){
                        item.classList.add('hidden')
                    }
                }
            })
        }
    }

    function modalWindow() {
        const submit = document.querySelector('.submit');
        const name = document.getElementById('name');
        const email = document.getElementById('email');

        submit.onclick = function () {
            const nameValue = name.value.trim();
            const emailValue = email.value.trim();

            if (nameValue && emailValue) {
                alert('Повідомлення з подякою за покупки');
                changeData(0, 0);
                togglePopUp();
                totalCost = 0;
                totalAmount = 0;
                name.value = '';
                email.value = '';
            } else {
                alert('Заповніть усі поля')
            }
        };

        orderButtons.forEach(b=> {
            b.addEventListener('click', togglePopUp)
        })

    }

    function togglePopUp() {
        modal.classList.toggle('active')
    }

    selectHandler();
    modalWindow();
    handlePurchases();
}





