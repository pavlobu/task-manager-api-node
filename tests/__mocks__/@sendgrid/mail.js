// allowing us not sending emails with sendgrid
// so we don't loose money on sending emails when
// test is running

module.exports = {
    setApiKey() {
        // nothing here
    },
    send() {
        // nothing here
    }
}