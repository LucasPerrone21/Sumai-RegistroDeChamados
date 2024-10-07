export default function grafico(){
    const canva = document.querySelector('#graficoCampus');

    const data = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'My First Dataset',
            data: [300, 50, 100, 40, 120, 24],
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