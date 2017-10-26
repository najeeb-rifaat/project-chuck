build_container: 
	docker build . -t=web-chuck

build_source:
	# %% Remove old build artifacts
	rm -rf build node_modules
	# %% Install dependancies 
	npm install
	# %% Build source
	npm run build

build: build_source build_container

.PHONY: build build_source build_container