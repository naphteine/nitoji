# nitoji
Nitoji Frontend

## Deployment steps

1. Remove 'proxy' from package.json
2. Check .env variables (REACT_APP_BACKEND)
3. yarn build
4. tar zcvmfp build.tgz build
5. scp build.tgz user@server:/home/user
