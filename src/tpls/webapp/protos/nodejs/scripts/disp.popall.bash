#!/bin/bash
DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
^^nodeScripts.forEach(function(n){$$
echo ^^=n.name$$
node ${DIR}/^^=n.name$$.js pop

^^})$$
