# Commands

stow: firefox policies

firefox:  (link "firefox"  "/lib64/firefox")
policies: (link "policies" "/etc/firefox/policies")

link package target:
	mkdir -p "{{target}}"
	stow --dotfiles --verbose=2 -t "{{target}}" "{{package}}"
