export class License {
    id: number;
    license_class: string;
    minimum_age: string;
    license_image: string;
    license_flow: string;
    constructor(license) {
      {
        this.id = license.id || this.getRandomID();
        this.license_class = license.license_class || '';
        this.minimum_age = license.minimum_age || '';
        this.license_image = license.license_image || '';
        this.license_flow = license.license_flow || '';
      }
    }
    public getRandomID(): string {
      const S4 = () => {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
      };
      return S4() + S4();
    }
  }
  