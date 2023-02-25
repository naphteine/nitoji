# nitoji

## Deployment steps

1. Remove 'proxy' from package.json
2. Check .env variables (REACT_APP_BACKEND)
3. yarn build
4. tar zcvmfp build.tgz build
5. scp build.tgz user@server:/home/user
6. tar xzvf build.tgz
7. rm -rf /var/www/nitoji.duga1.com/\*
8. mv -i build/\* /var/www/nitoji.duga1.com/
9. sudo chown -R user:www-data /var/www/nitoji.duga1.com
