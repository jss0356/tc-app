import HighchartsReact from "highcharts-react-official"
import Highcharts from "highcharts/highstock"
import moment from 'moment'
import priceData from '../assets/sampledData.json'

const LineGraph = () => {
    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {
      
      yAxis: [{
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value) 
          }
          ,
          x: -15,
          style: {
            "color": "#000", "position": "absolute"

          },
          align: 'left'
        },
      },
        
      ],
      tooltip: {
        shared: true,
        formatter: function () {
          return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
        }
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,

        }
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: `Market price`
      },
      chart: {
        height: 600,
      },
  
      credits: {
        enabled: false
      },
  
      legend: {
        enabled: true
      },
      xAxis: {
        type: 'date',
      },
      rangeSelector: {
        enabled:true,
        buttons: [{
          type: 'day',
          count: 1,
          text: '1d',
        }, {
          type: 'day',
          count: 7,
          text: '7d'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 3,
          text: '3m'
        },
          {
          type: 'all',
          text: 'All'
        }],
        selected: 4
      },
      series: [{
        name: 'Price',
        type: 'spline',
  
        data: priceData,
        tooltip: {
          valueDecimals: 2
        },
  
      }]
    }
  
  
    return (
        <HighchartsReact highcharts={Highcharts} constructorType={'stockChart'} options={configPrice}></HighchartsReact>
    )
}

export default LineGraph