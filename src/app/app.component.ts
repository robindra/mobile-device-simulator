import { Component, OnInit } from '@angular/core';
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'nodered-mock-device';
  client: any;
  deviceData: any;
  showLoader: boolean = false;
  listOfDeviceId: { [key: string]: string } = {};
  ngOnInit() {
    const url = 'ws://broker.emqx.io:8083/mqtt';
    const options = {
      // Clean session
      clean: true,
      connectTimeout: 100000,
      // Authentication
      clientId: '',
      username: 'emqx_test',
      password: 'emqx_test',
    };
    this.client = window?.mqtt.connect(url, options);
    this.client.on('connect', () => {
     
      this.client.subscribe('1/robin/ac/1', (err: any, data: any) => {
        // console.log('1/robin/ac', data);
      });
      this.client.subscribe('1/robin/ac/2', (err: any, data: any) => {
        // console.log('1/robin/ac', data);
      });
      this.client.subscribe('1/robin/ac/3', (err: any, data: any) => {
        // console.log('1/robin/ac', data);
      });

      this.client.subscribe('1/ryaan/ac/1', (err: any, data: any) => {
        // console.log('1/robin/ac', data);
      });
      this.client.subscribe('1/ryaan/ac/2', (err: any, data: any) => {
        // console.log('1/robin/ac', data);
      });
      this.client.subscribe('1/ryaan/ac/3', (err: any, data: any) => {
        // console.log('1/robin/ac', data);
      });
      // setInterval(() => {
      //   this.deviceData.updateTime = new Date().getTime();
      //   this.client.publish('CURRENT_DEVICE_INFO', JSON.stringify(this.deviceData));
      // }, 10000)
    });
    this.client.on(
      'message',
      this.onReceivedMessage
      // (err: any, data: any) => {
      // console.log(err, data.toString());
      // }
    );
  }

  onReceivedMessage = (topic: string, msg: any) => {
    switch (topic) {
      case '1/robin/ac/1':
        // console.log('subscribe 1/robin/ac/1', JSON.parse(msg.toString()));
        this.setData(JSON.parse(msg.toString()))
        break;
      case '1/robin/ac/2':
        // console.log('subscribe 1/robin/ac/2', JSON.parse(msg.toString()));
        this.setData(JSON.parse(msg.toString()))
        break;
      case '1/robin/ac/3':
        // console.log('subscribe 1/robin/ac/3', JSON.parse(msg.toString()));
        this.setData(JSON.parse(msg.toString()))
        break;
        case '1/ryaan/ac/1':
          // console.log('subscribe 1/ryaan/ac/1', JSON.parse(msg.toString()));
          this.setData(JSON.parse(msg.toString()))
        break;
        case '1/ryaan/ac/2':
        // console.log('subscribe 1/ryaan/ac/2', JSON.parse(msg.toString()));
        this.setData(JSON.parse(msg.toString()))
          break;
        case '1/ryaan/ac/3':
        // console.log('subscribe 1/ryaan/ac/3', JSON.parse(msg.toString()));
        this.setData(JSON.parse(msg.toString()))
          break;
      case 'NEW_DEVICE_SETTINGS':
        const data = JSON.parse(msg.toString());
        console.log(data);
        // this.deviceData = data;
        // this.showLoader = true;
        // setTimeout(() => {
        //   this.showLoader = false;
        // }, 3000);
        // this.notifyCurrentData(this.deviceData);
        break;
    }
  };

  setData(data: any): void {
    console.log('data ', data);
    this.deviceData = data;
    this.notifyCurrentData(this.deviceData);
  }

  notifyCurrentData(deviceData: any) {
    if (!this.listOfDeviceId[deviceData.id]) {
      setInterval(() => {
        this.deviceData.updateTime = new Date().getTime();
        this.client.publish(
          'CURRENT_DEVICE_INFO',
          JSON.stringify(this.deviceData)
        );
      }, 30000);
      this.listOfDeviceId[deviceData.id] = deviceData.id;
    }
  }
}
