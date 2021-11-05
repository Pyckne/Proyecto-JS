$('#paymentModal').append(`                <div class="modal-dialog modal-dialog-centered">
<div class="modal-content">
    <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Finalizar Compra</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body" id="modalBody">
        <div class="Prueba">
            <div class="d-flex justify-content-around" id="local-home">
                <h5>¿Qué prefiere?</h5>
                <select class="w-50">
                    <option selected class="local" id="local">Retirar en el local</option>
                    <option class="home" id="home">Recibir en domicilio</option>
                </select>
            </div>
            <div class="d-flex justify-content-center pt-4">
                <h5>Datos de contacto:</h5>
            </div>
            <div>
                <div class="d-flex flex-wrap justify-content-center" id="local-form">
                    <input class="local-name mb-1" type="text" name="name" placeholder="Nombre" required>
                    <input class="local-surname mb-1" type="text" name="surname" placeholder="Apellido" required>
                    <input class="local-phone mb-1" type="number" name="phone" placeholder="Teléfono" required>
                    <input class="local-email mb-1" type="text" name="mail" placeholder="Email" required>
                </div>
                <div class="d-flex flex-wrap justify-content-center pb-4" id="home-form">

                </div>
            </div>
            <div class="d-flex flex-wrap justify-content-around mb-2 mt-1">
                <h5 class="w-50">Elige un método de pago:</h5>
                <select class="w-50" id="method">
                    <option selected="selected" class="df">¡Haz click aquí!</option>
                    <option class="cc">Tarjeta de crédito</option>
                    <option class="dc">Tarjeta de débito</option>
                    <option class="bt">Transferencia bancaria</option>
                </select>
            </div>
            <div class="d-none d-flex flex-wrap justify-content-around mb-2" id="cuotify">
            <h5 class="w-50">Cantidad de cuotas:</h5>
            <select class="w-50" id="cuotify-options">
                <option>1</option>
                <option>3</option>
                <option>6</option>
                <option>9</option>
                <option>12</option>
                <option>18</option>
            </select>
            </div>
            <div class="d-none d-flex flex-wrap justify-content-around mb-2" id="total-cuotify">

            </div>
            <div class="d-none" id="credit-debit-card">
                <div class="row">
                    <div class="col-sm-6 w-100">
                        <div class="card">
                            <div class="card-header">
                                <strong>Ingrese los datos de la tarjeta</strong>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="name">Nombre</label>
                                            <input class="card-name form-control" id="name" type="text" placeholder="Como aparece en la tarjeta">
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-sm-12">
                                        <div class="form-group">
                                            <label for="ccnumber">Número de la tarjerta</label>
                                            <div class="input-group">
                                                <input class="card-number form-control" type="text" placeholder="0000 0000 0000 0000" autocomplete="email">
                                                <div class="input-group-append">
                                                    <span class="input-group-text">
                                                        <i class="mdi mdi-credit-card"></i>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group col-sm-4">
                                        <label for="ccmonth">Month</label>
                                        <select class="card-month form-control" id="ccmonth">
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                            <option>5</option>
                                            <option>6</option>
                                            <option>7</option>
                                            <option>8</option>
                                            <option>9</option>
                                            <option>10</option>
                                            <option>11</option>
                                            <option>12</option>
                                        </select>
                                    </div>
                                    <div class="form-group col-sm-4">
                                        <label for="ccyear">Year</label>
                                        <select class="card-year form-control" id="ccyear">
                                            <option>2014</option>
                                            <option>2015</option>
                                            <option>2016</option>
                                            <option>2017</option>
                                            <option>2018</option>
                                            <option>2019</option>
                                            <option>2020</option>
                                            <option>2021</option>
                                            <option>2022</option>
                                            <option>2023</option>
                                            <option>2024</option>
                                            <option>2025</option>
                                        </select>
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="form-group">
                                            <label for="cvv">CVV/CVC</label>
                                            <input class="card-cvc form-control" id="cvv" type="text" placeholder="123">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-wrap justify-content-between mb-2" id="bank-transfer">

            </div>
        </div>
    </div>
    <div class="modal-footer d-flex flex-wrap justify-content-between">
        <div id="total-payment"></div>
        <button type="button" class="btn btn-outline-success" id="submit-payment">Confirmar compra</button>
    </div>
</div>
</div>`);