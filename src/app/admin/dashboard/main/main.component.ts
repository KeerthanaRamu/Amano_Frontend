import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexFill,ApexMarkers,ApexGrid,ApexTitleSubtitle
} from 'ng-apexcharts';
import { DashboardService } from '../dashboard.service';




export type barChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  colors: string[];
};

export type avgLecChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  legend: ApexLegend;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public barChartOptions: Partial<barChartOptions>;
  public avgLecChartOptions: any;


  TotalStudents :any;
  NewStudents :any;
  TotalEmployees :any;
  TotalRevenue :any;
  TodayStudents :any;
  YesterdayStudents :any;
  MonthStudents :any;
  TodaySales:any;
  YesterdaySales:any;
  MonthSales:any;

  constructor(private dashboardService:DashboardService) {}

  ngOnInit() {
    this.getDashboardCount();
    this.getDashboardSalesReport();
    this.getDashboardRegistrationReport();
    this.getStudentMonthlyReport();
    this.getSalesMonthlyReport();
  }

  getDashboardCount(){
    this.dashboardService.getDashboardCount()
    .subscribe((res)=>{
        this.TotalStudents=res['TotalStudents'];
        this.NewStudents=res['NewStudents'];
        this.TotalEmployees=res['TotalEmployees'];
        this.TotalRevenue=res['TotalRevenue'];
    })
  }

  getDashboardRegistrationReport(){
    this.dashboardService.getDashboardRegistrationReport()
    .subscribe((res)=>{
        this.TodayStudents=res['TodayStudents'];
        this.YesterdayStudents=res['YesterdayStudents'];
        this.MonthStudents=res['MonthStudents'];
    })
  }

  getDashboardSalesReport(){
    this.dashboardService.getDashboardSalesReport()
    .subscribe((res)=>{
      console.log("res===",res)
        this.TodaySales=res['TodaySales'];
        this.YesterdaySales=res['YesterdaySales'];
        this.MonthSales=res['MonthSales'];
    })
  }

  getStudentMonthlyReport(){
    this.dashboardService.getStudentMonthlyReport()
    .subscribe((res)=>{
      let studentsCount=[];
      let resObj=res['data'];
      console.log("resObj---month--------",resObj,resObj[0].Month)
      let monthArr=[1,2,3,4,5,6,7,8,9,10,11,12];
      var monthCat=[
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      for(let i=0;i<resObj.length;) {
        for(let j=0;j<monthArr.length;j++){
            if(resObj[i]){
              console.log("resObj[i].Month----------",resObj[i].Month)
                if(resObj[i].Month == monthArr[j]){
                  studentsCount.push(resObj[i].Student);
                        delete resObj[i].Month;
                        i++;
                }else{
                  studentsCount.push(0);
                }
            }
        }
    }
    console.log("studentsCount!!!!!!!!!!!",studentsCount);
    monthCat.length=studentsCount.length;
    this.studentsChart(studentsCount,monthCat);
    })
  }

  getSalesMonthlyReport(){
    this.dashboardService.getSalesMonthlyReport()
    .subscribe((res)=>{
      let salesCount=[];
      let resObjSales=res['data'];
      let monthArrSales=[1,2,3,4,5,6,7,8,9,10,11,12];
      for(let i=0;i<resObjSales.length;) {
        for(let j=0;j<monthArrSales.length;j++){
            if(resObjSales[i]){
                if(resObjSales[i].Month == monthArrSales[j]){
                  salesCount.push(resObjSales[i].Sales);
                        delete resObjSales[i].Month;
                        i++;
                }else{
                  salesCount.push(0);
                }
            }
        }
    }
    console.log("studentsCount!!!!!!!!!!!",salesCount);
        this.salesChart(salesCount)
    })
  }



  private salesChart(salesCount) {
    this.avgLecChartOptions = {
      series: [
        {
          name: 'Revenue Per Month',
          data: salesCount,
        },
      ],
      chart: {
        height: 350,
        type: 'line',
        dropShadow: {
          enabled: true,
          color: '#000',
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2,
        },
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'March', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct','Nov','Dec'],
        title: {
          text: 'Weekday',
        },
      },
      yaxis: {
        title: {
          text: 'Revenue Per Month',
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          gradientToColors: ['#35fdd8'],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100],
        },
      },
      markers: {
        size: 4,
        colors: ['#FFA41B'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        },
      },
      tooltip: {
        theme: 'dark',
        marker: {
          show: true,
        },
        x: {
          show: true,
        },
      },
    };
  }
  

  private studentsChart(studentsCount,monthCat) {
    this.barChartOptions = {
      series: [
        {
          name: 'count',
          data: studentsCount, 
        },
      ],
      chart: {
        height: 320,
        type: 'bar',
        toolbar: {
          show: false,
        },
        foreColor: '#9aa0ac',
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#9aa0ac'],
        },
      },

      xaxis: {
        categories:monthCat,
        position: 'bottom',
        labels: {
          offsetY: 0,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
          offsetY: -35,
        },
      },
      fill: {
        type: 'gradient',
        colors: ['#4F86F8', '#4F86F8'],
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100],
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: false,
          formatter: function (val) {
            return val + '';
          },
        },
      },
    };
  }
  
 
}
