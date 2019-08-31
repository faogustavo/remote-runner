# Remote Runner
A simple way to execute small blocks of code

## Motivation
Every time I start building a presentation with code, I always had the same "problem". 
I have to run the code and put it "statically" in the presentation.
With the remote runner, I can create a small plugin to the presentation tool and enable live coding direct on it.

## Support
Right now, we just support the following languages:
- [X] C (GCC 9.2.1)
- [X] Java (OpenJDK8)
- [X] Node (10.15.2)
- [X] Python (2.7.16)
- [X] Ruby (2.5.5)
- [X] Kotlin (KotlinJVM 1.3.50)

Unfortunately, It doesn't support using package managers (like npm/mvn/brew/pip) yet.

## Running
You can run this project easily with the docker image. You just have to run this command:

```
docker run -p 8080:8080 faogustavo/remote-runner
```

Or, if you prefer to run in your machine, you just need `node` and `yarn`.

```
yarn;
yarn start
```

The version of node used to the development was the actual LTS (Node10), but I already tested with Node 12 and worked fine.
If you have NVM installed, the project has an `.nvmrc`, and you can just use it to configure the node to the right version..

```
nvm use
```

## Communication
The communication with the app, is entirely made by websockets.
To execute some action, you just have to send a JSON to it.
To test the project, you can use the [wscat](https://www.npmjs.com/package/wscat) lib or [WebSocket echo page](https://www.websocket.org/echo.html).

### Actions

#### getVersions
- List the version of all the supported languages that are implemented. If one of them is not supported, the value will be as a boolean `false`.

Input:
```
{ "action": "getVersions" }
```

Output:
```
{
    "node": "v10.15.2\n",
    "python": "Python 2.7.16+\n",
    "ruby": "ruby 2.5.5p157 (2019-03-15 revision 67260) [x86_64-linux-gnu]\n",
    "php": "PHP 7.2.19-0ubuntu1 (cli) (built: Jun 4 2019 11:32:21) ( NTS )\nCopyright (c) 1997-2018 The PHP Group\nZend Engine v3.2.0, Copyright (c) 1998-2018 Zend Technologies\n with Zend OPcache v7.2.19-0ubuntu1, Copyright (c) 1999-2018, by Zend Technologies\n",
    "c": "Using built-in specs.\nCOLLECT_GCC=gcc\nCOLLECT_LTO_WRAPPER=/usr/lib/gcc/x86_64-linux-gnu/9/lto-wrapper\nOFFLOAD_TARGET_NAMES=nvptx-none:hsa\nOFFLOAD_TARGET_DEFAULT=1\nTarget: x86_64-linux-gnu\nConfigured with: ../src/configure -v --with-pkgversion='Ubuntu 9.2.1-6ubuntu1' --with-bugurl=file:///usr/share/doc/gcc-9/README.Bugs --enable-languages=c,ada,c++,go,brig,d,fortran,objc,obj-c++,gm2 --prefix=/usr --with-gcc-major-version-only --program-suffix=-9 --program-prefix=x86_64-linux-gnu- --enable-shared --enable-linker-build-id --libexecdir=/usr/lib --without-included-gettext --enable-threads=posix --libdir=/usr/lib --enable-nls --enable-bootstrap --enable-clocale=gnu --enable-libstdcxx-debug --enable-libstdcxx-time=yes --with-default-libstdcxx-abi=new --enable-gnu-unique-object --disable-vtable-verify --enable-plugin --enable-default-pie --with-system-zlib --with-target-system-zlib=auto --enable-multiarch --disable-werror --with-arch-32=i686 --with-abi=m64 --with-multilib-list=m32,m64,mx32 --enable-multilib --with-tune=generic --enable-offload-targets=nvptx-none,hsa --without-cuda-driver --enable-checking=release --build=x86_64-linux-gnu --host=x86_64-linux-gnu --target=x86_64-linux-gnu\nThread model: posix\ngcc version 9.2.1 20190827 (Ubuntu 9.2.1-6ubuntu1) \n",
    "java": "openjdk version \"1.8.0_222\"\nOpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu3-b10)\nOpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)\n",
    "kotlin": "info: kotlinc-jvm 1.3.50 (JRE 1.8.0_222-8u222-b10-1ubuntu3-b10)\n"
}
```

#### getVersion
- Get the version of one specific language. You need to provide the language in the `lang` attribute.

Input:
```
{ 
    "action": "getVersion", 
    "lang": "java" 
}
```

Output:
```
{ 
    "java": "openjdk version \"1.8.0_222\"\nOpenJDK Runtime Environment (build 1.8.0_222-8u222-b10-1ubuntu3-b10)\nOpenJDK 64-Bit Server VM (build 25.222-b10, mixed mode)\n",
    "kotlin": "info: kotlinc-jvm 1.3.50 (JRE 1.8.0_222-8u222-b10-1ubuntu3-b10)\n" 
}
```

#### run
- Executes the code on the specific language. You need to provide the language in the `lang` attribute and the code in the `code` attribute.

Input:
```
{ 
    "action": "run", 
    "lang": "node", 
    "code": "console.log('Hello from Node')" 
}
```

Output:
```
{ 
    "output": "Hello from Node\n",
    "error": ""
}
```

If you you code has any **error**, you will receive a message on the error like this
Input:
```
{ 
    "action": "run", 
    "lang": "c", 
    "code": "#include <stdio.h>\nint main() {\n    printf(\"Hello from C\")\n}" // Missing semicolon after printf
}
```

Output:
```
{
    "output":"",
    "error":"code.c:3:27: error: expected ';' after expression\n printf(\"Hello from C\")\n ^\n ;\n1 error generated.\n"
}
```