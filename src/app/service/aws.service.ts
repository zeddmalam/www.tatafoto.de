/// <reference types="aws-sdk" /> 

import { Injectable } from '@angular/core';
import * as AWS from 'aws-sdk';
import { Album } from "app/model/Album";

@Injectable()
export class AwsService {
	lambda: any = null;
	sns: any = null;
	snsTargetArn: string = 'arn:aws:sns:eu-west-1:596757887524:www-tatafoto-de';
	identityPoolId: string = 'eu-west-1:48a38394-ff07-4e72-b1e4-f930eda2708e';
	env: string = 'PROD';

	constructor() {
		AWS.config.update({region: 'eu-west-1'});
		AWS.config.credentials = new AWS.CognitoIdentityCredentials({IdentityPoolId: this.identityPoolId});
		this.lambda = new AWS.Lambda();
		this.sns = new AWS.SNS();
	}

	getProducts(locale: string){
		let self = this;
		return new Promise((resolve, reject) => {
			self.lambda.invoke({
				FunctionName: 'products:' + self.env,
				Payload: JSON.stringify({locale: locale})
			}, (err, data) => {
				if(err){
					console.log('getProducts error:', err.stack);
					return reject(err);
				}
				resolve(JSON.parse(data.Payload).packages);
			});
		});
	}

	getAlbums(){
		let self = this;
		return new Promise((resolve, reject) => {
			self.lambda.invoke({
				FunctionName: 'api-album:' + self.env,
				Payload: JSON.stringify({method: "LIST"})
			}, (err, data) => {
				if(err){
					console.log('getAlbums error:', err.stack);
					return reject(err);
				}
				resolve(JSON.parse(data.Payload));
			});
		});
	}

	getAlbum(id:string){
		let self = this;
		return new Promise((resolve, reject) => {
			self.lambda.invoke({
				FunctionName: 'api-album:' + self.env,
				Payload: JSON.stringify({
					method: "GET",
					id:id
				})
			}, (err, data) => {
				if(err){
					console.log('getAlbums error:', err.stack);
					return reject(err);
				}
				resolve(JSON.parse(data.Payload));
			});
		});
	}

	sendNotification(message: string, subject: string){
		let self = this;
		return new Promise((resolve, reject) => {
			self.sns.publish({
				Message: message,
				Subject: subject,
				TargetArn: self.snsTargetArn
			}, function (err, data) {
				if (err) {
					console.log('sendNotification error:', err.stack);
					return reject(err);
				} else {
					resolve(data);
				}
			});
		});
	}

	getGlobalSlides(){
		return [
			{ src: 'assets/images/IMG_2499_moz3.jpg' },
			{ src: 'assets/images/IMG_6888_3b.jpg' },
			{ src: 'assets/images/IMG_2546.jpg' },
			{ src: 'assets/images/IMG_4639-2.jpg' },
			{ src: 'assets/images/IMG_6129-9L-a.jpg' },
			{ src: 'assets/images/IMG_2285-4_small.jpg' },
			{ src: 'assets/images/IMG_6158_3L-a.jpg' },
			{ src: 'assets/images/IMG_7178.jpg' },
			{ src: 'assets/images/IMG_7196.jpg' },
			{ src: 'assets/images/IMG_8084-Recovered.jpg' },
			{ src: 'assets/images/IMG_8107-2.jpg' },
			{ src: 'assets/images/IMG_2707_small-2.jpg' },
			{ src: 'assets/images/IMG_6097-8a.jpg' },
			{ src: 'assets/images/IMG_8654-2.jpg' }
		];
	}
}