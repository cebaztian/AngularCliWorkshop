export class LogEntry {
    public level: string;
    public message: string;
    public appname: string;
    public host: string;
    public logger_name: string;

    constructor(message: string | any = '', host: string = '') {
        this.message = message;
        this.host = host;
        this.level = 'ERROR';
        this.appname = 'Frontend';
        this.logger_name = 'co.ceiba.epcr.frontend';
    }
}
