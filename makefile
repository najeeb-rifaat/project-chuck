build_container: 
	docker build . -t=project-chuck

build_source:
	# %% Remove old build artifacts
	rm -rf build node_modules
	# %% Install dependancies 
	npm install
	# %% Run tests
	npm test
	# %% Build source
	npm run build

build: build_source build_container

.PHONY: build build_source build_container