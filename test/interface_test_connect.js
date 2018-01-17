
describe('connect user', function() {
	this.timeout(10000);

	before(() => {
		current_user.login();
	});

	after(()=>{
		current_user.logout();
	});

	beforeEach(async function () {
		await waitForElement('#btnLogin');
		vm.page_visible = vm.PAGE_CONNECT;
		await sleep(1000);
	});

	afterEach(function () {
		// completely restore all fakes created through the sandbox
		sandbox.restore();
	});

	it('should connect with a name', async () => {
		const stub = sandbox.stub(current_message_list, 'getRecipientPublicKey').resolves(true);
		vm.add_name = 'username';
		await Vue.nextTick();
		$('#btnConnectUser').click();
		assert(stub.called);
	});

	it('should fail without a name', async () => {
		vm.add_name = '';
		await Vue.nextTick();
		$('#btnConnectUser').click();
		assert(vm.error_message === "username cannot be empty", "toast text does not match: "+vm.error_message);
	});

	it('should show a qr', async () => {
		$('#btnShowQR').click();
		await Vue.nextTick();
		assert(vm.page_visible===vm.PAGE_QRCODE, "connect page not showing");
	});
});