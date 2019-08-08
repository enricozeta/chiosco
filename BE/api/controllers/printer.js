const ThermalPrinter = require('node-thermal-printer').printer;
const Types = require('node-thermal-printer').types;

async function printOrder(order) {

    let printer = new ThermalPrinter({
        type: Types.EPSON,  // 'star' or 'epson'
        interface: 'dev/usb/lp0',
        options: {
            timeout: 300
        }
    });
    let isConnected = await printer.isPrinterConnected();
    if (isConnected) {
        printer.alignCenter();
        printer.print("Hello word");
        printer.cut();
        try {
            await printer.execute();
            console.log("Print success.");
        } catch (error) {
            console.error("Print error:", error);
        }
    }

}
module.exports.printOrder = printOrder;