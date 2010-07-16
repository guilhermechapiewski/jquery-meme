SRCDIR := $(shell pwd)

os := $(shell uname)
browser := `if [ "$(os)" == "Darwin" ]; then echo "safari" ; else echo "chrome"; fi`
url := http://localhost
verbosity := 3
pattern := *.acc
scenarios_to_run := `if [ "$(scenario)" ]; then echo "-s $(scenario)"; fi`

acceptance:
	@make selenium_up
	@make wait
	@echo "================="
	@echo "Starting tests..."
	@echo "-----------------"
	@echo "browser: $(browser)"
	@echo "verbosity level: $(verbosity)"
	@echo "match pattern: $(pattern)"
	@echo "================="
	@pyccuracy_console -u $(url) -d tests -v $(verbosity) -b $(browser) -R false -p "$(pattern)" $(scenarios_to_run)
	@-make selenium_down

selenium_up:
	@echo "Starting selenium..."
	@java -jar $(SRCDIR)/lib/selenium-server.jar 2> /dev/null > /dev/null &
	@echo "Started."

selenium_down:
	@echo "Killing selenium..."
	@-ps aux | egrep selenium | egrep -v egrep | awk '{ print $$2 }' | xargs kill -9
	@echo "Killed."

wait:
	@echo "Waiting..."
	@sleep 5