const Generator = require('yeoman-generator');

module.exports = class Store extends Generator {
	constructor(args, opts) {
		super(args, opts);
		this.options = {
			...this.options,
			...opts
		};
		if (!opts.name) {
			this.argument('name', { type: String, required: false });
		}
	}

	async propmting() {
		this.answers = await this.prompt([
			{
				name: 'name',
				message: 'Store name'
			}
		]);
	}

	writing() {
		this.name = this.answers.name;

		const createFileStore = (file, folder, data = {}) => {
			if (
				!this.fs.exists(this.destinationPath(`src/store/${folder}/${file}.ts`))
			) {
				this.fs.copyTpl(
					this.templatePath(`_${file}.ts`),
					this.destinationPath(`src/store/${folder}/${this.name}.ts`),
					data
				);
			}
		};

		createFileStore('reducer', 'reducers', { name: this.name });
		createFileStore('action', 'actions', { name: this.name });
		createFileStore('actionCreator', 'actionCreators', {
			name: this.name
		});
		createFileStore('service', 'services', { name: this.name });
		createFileStore('constant', 'constants', { name: this.name });
		createFileStore('middleware', 'middlewares', { name: this.name });
		if (!this.fs.exists(this.destinationPath('src/store/index.ts'))) {
			this.fs.copyTpl(
				this.templatePath('_index.ts'),
				this.destinationPath(`src/store/index.ts`),
				{ name: this.name }
			);
		}
	}
};
