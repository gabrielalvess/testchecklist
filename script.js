//tabs
const tabs = document.querySelectorAll('.tab');
const seletor = document.getElementById('selectTabs');
let currentTab = 0;

function showTab(index) {
    tabs.forEach((tab, i) => {
        tab.classList.toggle('block', i === index);
        tab.classList.toggle('hidden', i != index);
    });
    seletor.value = index;
}

seletor.addEventListener('change', function () {
    currentTab = parseInt(seletor.value);
    showTab(currentTab);
});

document.getElementById('prevTab').addEventListener('click', () => {
    currentTab = (currentTab - 1 + tabs.length) % tabs.length;
    showTab(currentTab);
});

document.getElementById('nextTab').addEventListener('click', () => {
    currentTab = (currentTab + 1) % tabs.length;
    showTab(currentTab);
});

showTab(currentTab);

document.getElementById('showClient').addEventListener('click', () => {
    document.getElementById('clientTab').classList.toggle('hidden');
});

// PDF

function getClientData() {
    const clientTab = document.getElementById('clientTab');
    const client = {};
    clientTab.querySelectorAll('input').forEach(input => {
        if (input.value.trim() !== '') {
            client[input.name] = input.value;
        }
    });
    return client;

}

function getPecasData() {
    const pecasTab = document.getElementById('pecasTab');
    const pecas = {};
    pecasTab.querySelectorAll('input').forEach(input => {
        if ((input.type === 'checkbox' || input.type === 'radio')) {
            if(input.checked){
                pecas[input.name] = input.value;
                }
        }
    });
    return pecas;
}

function getPecasOutros() {
    const pecasTab = document.getElementById('pecasTab');
    const pecasOutros = {};
    pecasTab.querySelectorAll('input').forEach(input => {
        if (input.type == 'text') {
                pecasOutros[input.name] = input.value;
            }
    });
    return pecasOutros;
}

document.getElementById('save').addEventListener('click', () => {
    var pecas = Object.getOwnPropertyNames(getPecasData())
    var situacao = Object.values(getPecasData())
    var outros = Object.values(getPecasOutros())
    var quantPecas = pecas.length;

    var generateData = function () {
        var result = [];
        var data = {};
        for (var i = 0; i < quantPecas; i += 1) {
            data.Peça = pecas[i];
            data.Situação = situacao[i];
            data.Observação = outros[i];
            if(data.Situação != '' || data.Observação != ''){
            result.push(Object.assign({}, data));
            }
        }
        return result;
    };

    function createHeaders(keys) {
        var result = [];
        for (var i = 0; i < keys.length; i += 1) {
            result.push({
                id: keys[i],
                name: keys[i],
                prompt: keys[i],
                width: 65,
                align: "center",
                padding: 0
            });
        }
        return result;
    }

    var headers = createHeaders([
        "Peça",
        "Situação",
        "Observação",
    ]);

    var doc = new jsPDF({
        orientation: 'p',
        format: 'a4',
        putOnlyUsedFonts: true
    });
    doc.table(1, 1, generateData(), headers, { autoSize: false });
    doc.save("test.pdf");
});
