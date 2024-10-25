export default function gerarGrafico(dados){
    const canva = document.querySelector('#graficoCampus');

    const campi = {}

    for(const dado of dados){
        if(campi[dado.campus]){
            campi[dado.campus]++
        }
        else{
            campi[dado.campus] = 1
        }
    }

    const data = {
        labels: Object.keys(campi),
        datasets: [{
            label: 'Atendimentos',
            data: Object.values(campi),
            backgroundColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(153, 102, 255)',
                'rgb(255, 159, 64)'
            ]
        }]
    }

    const config = {
        type: 'doughnut',
        data,
        maintainAspectRatio: false
    }

    new Chart(canva, config)
}