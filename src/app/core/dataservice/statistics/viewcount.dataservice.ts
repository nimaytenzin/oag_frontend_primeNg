import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, startWith } from 'rxjs';
import { AngularDeviceInformationService } from 'angular-device-information';

import { environment } from 'src/environments/environment';
import { CreateViewCountDto } from '../../dto/statistics/viewcount.dto';

@Injectable({
    providedIn: 'root',
})
export class ViewCountService {
    private apiUrl = environment.apiUrl;

    constructor(
        private deviceInformationService: AngularDeviceInformationService,
        private http: HttpClient
    ) {}

    async getLocation(): Promise<{ lat: number; lng: number } | string> {
        try {
            // Check if the Permissions API is available
            if (navigator.permissions) {
                const result = await navigator.permissions.query({
                    name: 'geolocation',
                });

                // If the permission state is 'prompt', prompt the user for permission
                if (result.state === 'prompt') {
                    return await this.promptUserForPermission();
                } else if (result.state === 'granted') {
                    // If permission is already granted, proceed to get the current location
                    return await this.getCurrentLocation();
                } else {
                    // If permission is denied, return an error message
                    return 'Permission denied';
                }
            } else {
                // If the Permissions API is not supported, return an error message
                return 'Permissions API not supported';
            }
        } catch (error) {
            // Handle any errors that occur during the process
            return 'An error occurred while trying to get the location.';
        }
    }

    private async promptUserForPermission(): Promise<{
        lat: number;
        lng: number;
    }> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position) {
                            const location = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            resolve(location);
                        }
                    },
                    (error) =>
                        reject('Geolocation is not supported by this browser.')
                );
            } else {
                reject('Geolocation API not supported');
            }
        });
    }

    private getCurrentLocation(): Promise<{ lat: number; lng: number }> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        if (position) {
                            const location = {
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                            };
                            resolve(location);
                        }
                    },
                    (error) =>
                        reject('Geolocation is not supported by this browser.')
                );
            } else {
                reject('Geolocation is not supported by this browser.');
            }
        });
    }

    GetDeviceInformation() {
        return this.deviceInformationService.getDeviceInfo();
    }

    async IncrementLegislationViewCount(legislationId: number) {
        try {
            const res: any = await this.getLocation();
            console.log('Location response:', res); // Log the response for debugging

            const data: CreateViewCountDto = {
                legislationId: legislationId,
            };

            const deviceInfo = this.GetDeviceInformation();

            if (deviceInfo.browser) {
                data.browser = deviceInfo.browser;
            }
            if (deviceInfo.os) {
                data.os = deviceInfo.os;
            }
            if (deviceInfo.userAgent) {
                data.userAgent = deviceInfo.userAgent;
            }
            if (deviceInfo.screen_resolution) {
                data.screenResolution = deviceInfo.screen_resolution;
            }
            if (res.lat) {
                data.lat = res.lat;
            }
            if (res.lng) {
                data.lng = res.lng;
            }

            console.log('INCREMENTING VIEW COUNT', data);

            try {
                this.CreateViewCount(data).subscribe((res) => {
                    console.log(res);
                });
            } catch (error) {
                console.error('Error sending POST request:', error);
            }
        } catch (error) {
            console.error('Error in IncrementLegislationViewCount:', error);
        }
    }

    CreateViewCount(data: CreateViewCountDto) {
        return this.http.post(`${this.apiUrl}/view-count`, data);
    }
}
