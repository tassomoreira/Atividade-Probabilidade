const qtdExps = document.querySelector("#qtdExps");
const probSucesso = document.querySelector("#probSucesso");
const btnGerar = document.querySelector("#btnGerar");
let myChart = document.querySelector("#myChart");

let arrayProbs = [];
let arrayLabels = [];
myChart = criarGrafico();

function calcularFatorial(num) {
  if (num < 0) {
    return -1;
  }
  if (num == 0 || num == 1) {
    return 1;
  }
  return num * calcularFatorial(num - 1);
}

function numeroBinomial(n, k) {
  return calcularFatorial(n) / (calcularFatorial(k) * calcularFatorial(n - k));
}

function distribuicaoBinomial(n, p) {
  for (let k = 0; k <= n; k++) {
    let distrProb =
      numeroBinomial(n, k) * Math.pow(p, k) * Math.pow(1 - p, n - k);
    arrayProbs.push(distrProb);
    arrayLabels.push(k);
  }
}

function criarGrafico() {
  const ctx = document.querySelector("#myChart").getContext("2d");

  let data = {
    labels: arrayLabels,
    datasets: [
      {
        label: "Probabilidade",
        data: arrayProbs,
      },
    ],
  };

  var options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  let myChart = new Chart(ctx, {
    type: "bar",
    data: data,
    options: options,
  });

  return myChart;
}

btnGerar.addEventListener("click", (event) => {
  event.preventDefault();

  let n = parseInt(qtdExps.value);
  let p = parseFloat(probSucesso.value);

  if (isNaN(n) || isNaN(p) || n <= 0 || p < 0 || p > 1) {
    alert("Por favor, insira valores válidos para n e p.");
    return;
  }

  arrayProbs = [];
  arrayLabels = [];

  distribuicaoBinomial(n, p);

  myChart.data.labels = arrayLabels;
  myChart.data.datasets[0].data = arrayProbs;
  myChart.update();
});
