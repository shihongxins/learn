## Git简单学习  
Git是**分布式版本控制系统**。CVS及SVN都是集中式的版本控制系统。分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库。

### 安装配置
在Windows上安装Git：从Git官网直接下载安装程序，安装完成后，在开始菜单里找到“Git”->“Git Bash”，安装完成后，还需要最后一步设置，在命令行输入：
```
$ git config --global user.name "Your Name"
$ git config --global user.email "email@example.com"	
```
注意git config命令的--global参数，用了这个参数，表示你这台机器上所有的Git仓库都会使用这个配置，当然也可以对某个仓库指定不同的用户名和Email地址。

### 创建版本库
**版本库**又名**仓库**，英文名*repository*，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。
创建一个版本库非常简单，首先，选择一个合适的地方，创建一个空目录：
```
$ mkdir learngit
$ cd learngit
$ pwd
```
pwd命令用于显示当前目录。
第二步，通过```$ git init```命令把这个目录变成Git可以管理的仓库：
```
$ git init
```
所有的版本控制系统，其实只能跟踪文本文件的改动，比如TXT文件，网页，所有的程序代码等等，Git也不例外。而图片、视频这些二进制文件，虽然也能由版本控制系统管理，但没法跟踪文件的变化，只能把二进制文件每次改动串起来，也就是只知道图片从100KB改成了120KB，但到底改了啥，版本控制系统不知道，也没法知道。
	
### 添加文件到Git版本库  
#### 第一步，使用命令```$ git add <filename>```，注意，可反复多次使用，添加多个文件；
注：批量操作
```
$ git add .		#新增、修改、删除
$ git add -A 	#新增、修改、删除
$ git add -u 	#修改、删除
$ git add --ignore-removal. 	#新增、修改
```
#### 第二步，使用命令```$ git commit -m "提交说明"```完成。	
如：在仓库新建readme.txt，通过```$ git add readme.txt```添加准备提交，通过```$ git commit -m "wrote a new file readme.txt"```提交到仓库。  
查看仓库当前的状态```$ git status```命令可以让我们时刻掌握仓库当前的状态。
如修改readme.txt的内容，运行```$ git status```命令，可以知道readme.txt被修改了但还没有提交。  
通过```$ git diff```查看文件修改的具体内容。  
如```$ git diff readme.txt```可以知道文件具体什么位置被修改。确定无误后再次提交文件到仓库。

### 本地版本库的历史回退
当你觉得文件修改到一定程度的时候，就可以“保存一个快照”，这个快照在Git中被称为commit。一旦你把文件改乱了，或者误删了文件，还可以从最近的一个commit恢复，
#### 通过```$ git log```命令查看历史修改记录。
```$ git log```命令显示从最近到最远的提交日志，我们可以看到3次提交，最近的一次是append GPL，上一次是add distributed，最早的一次是wrote a readme file。如果嫌输出信息太多，看得眼花缭乱的，可以试试加上```--pretty=oneline```参数，如果历史记录过多，导致最后显示 <END> 且无法继续输入命令时，按<kbd>Q</kbd> 退出。  
在Git中，用**HEAD**表示当前版本（今天），上一个版本就是**HEAD\^**（昨天），上上一个版本就是**HEAD\^\^**（前天），当然往上100个版本写100个^比较容易数不过来，所以写成**HEAD~100**（100天前）。
#### 通过命令```$ git reset --hard HEAD^```  
回到上一版本（回到了昨天）。如果我又后悔回退，想回到最新版本（返回今天），只要窗口未关闭，我们可以通过commit id 返回到指定版本。但如果窗口关闭了，记不得commit id。我们可以用```$ git reflog```查看历史命令获得具体commit id，然后回到相应版本。

工作区，即我电脑里能够看到的目录。版本库即工作区里面的.Git目录，里面又包括stage（暂存区）和Git自动为我们创建的第一个分支 master 及指向master分支的第一个指针HEAD。  
图示
![工作区 暂存区 版本库](https://camo.githubusercontent.com/b3d7b546b4a699a8c010c58a3f28571757682bfc/68747470733a2f2f63646e2e6c69616f78756566656e672e636f6d2f63646e2f66696c65732f6174746163686d656e74732f30303133383439303737323034353865353637353164663163343734343835623639373537353037336334306165393030302f30)
```
$ git diff    #是工作区(work dict)和暂存区(stage)的比较
$ git diff --cached    #是暂存区(stage)和版本库(repository)的比较
$ git diff HEAD -- <filename>  #是工作区(work dict)与版本库(repository)的比较
```
当我们修改一个文件并添加到暂存区后，再次修改文件，然后提交到版本库，我们会发现这次提交只提交了第一次的修改，因为第二次的我们没有添加到暂存区，也就没有提交。因此，我们可以修改一次添加一次提交一次再重复一次，也可以修改一次添加两次提交一次。

错误编辑了文件但还没有添加(add)到暂存区(stage)时，使用```$ git checkout -- <filename>``` 可以丢弃工作区(work dict)的修改，从暂存区(stage)恢复内容到工作区(work dict)（相当于手动打开文件并删除修改）。  
错误编辑了文件已经添加到缓存区(stage)但还未提交到版本库(repository)中时，使用```$ git reset HEAD <filename>```可以撤销缓存区(stage)修改，将文件重新放回工作区(work dict)，然后在丢弃工作区修改```$ git checkout -- <filename>```。  
错误编辑了文件已经添加并且提交到版本库，只有**版本回退**了，接着撤销缓存区修改，最后丢弃工作区修改。且前提是还没有推送到远程仓库。  

如果我添加并且提交某一文件到版本库后，我又删除了文件（通过资源管理器直接删除，或者通过 rm <filename> 命令删除），Git会检测到我在工作区已经删除了文件，但在版本库还未删除，也是工作区就和暂存区不同。那么我有两种选择：  
+ 一是确定要删除文件，则要通过```$ git rm <filename>```命令从暂存区删除后，在通过```$ git commit -m "xxx"```命令提交到版本库。  
+ 二是错误删除文件，则要通过```$ git checkout -- <filename>``` 命令从暂存区恢复。  

重点是如果我用```$ git rm <filename>``` 命令后，我已经删除了本地文件和同步删除动作到缓存区（即缓存区文件也被删除），那么我是无法通过```$ git checkout -- <filename>```找回文件的，我只能从```$ git reset HEAD <filename>```从版本库找回，再用```$ git checkout -- <filename>```丢弃工作区修改。  
如果既用了```$ git rm <filename>```又用```$ git commit -m "xxx"```后，我是无法通过```$ git reset HEAD <filename>```找回的，只能通过版本回退```$ git reset --hard HEAD^```在按前面步骤找回。

### 远程仓库GitHub
Git是分布式版本控制系统，同一个Git仓库，可以分布到不同的机器上。实际情况往往是这样，找一台电脑充当服务器的角色，每天24小时开机，其他每个人都从这个“服务器”仓库克隆一份到自己的电脑上，并且各自把各自的提交推送到服务器仓库里，也从服务器仓库中拉取别人的提交。这个世界上有个叫GitHub的神奇的网站，从名字就可以看出，这个网站就是提供Git仓库托管服务的，所以，只要注册一个GitHub账号，就可以免费获得Git远程仓库。

首先检查本地用户目录是否有 ==.ssh== 文件夹，再检查里面是否有 ==id_rsa==（私钥） 和 ==id_rsa.pub==（公钥） 文件，如果没有则用```$ ssh-keygen -t rsa -C "youremail@example.com"```命令创建，然后将公钥添加到自己的GitHub上。  
在GitHub上创建一个远程仓库，然后关联一个远程库，使用命令```$ git remote add origin git@server-name:path/repo-name.git```关联后，使用命令```$ git push -u origin master``` 第一次推送master分支的所有内容；此后，每次本地提交后，只要有必要，就可以使用命令```$ git push origin master```推送最新修改。   
clone 远程仓库到本地版本库 
要克隆一个仓库，首先必须知道仓库的地址，然后使用```$ git clone```命令克隆。Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。
		
### 分支管理
你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。
在Git里，这个分支叫主分支，即master分支。HEAD严格来说不是指向提交，而是指向master，master才是指向提交的，所以，HEAD指向的就是当前分支。一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点。每次提交，master分支都会向前移动一步，这样，随着你不断提交，master分支的线也越来越长。当我们创建新的分支，例如dev时，Git新建了一个指针叫dev，指向master相同的提交，再把HEAD指向dev，就表示当前分支在dev上，你看，Git创建一个分支很快，因为除了增加一个dev指针，改改HEAD的指向，工作区的文件都没有任何变化！不过，从现在开始，对工作区的修改和提交就是针对dev分支了，比如新提交一次后，dev指针往前移动一步，而master指针不变，假如我们在dev上的工作完成了，就可以把dev合并到master上。Git怎么合并呢？最简单的方法，就是直接把master指向dev的当前提交，就完成了合并，合并完分支后，甚至可以删除dev分支。删除dev分支就是把dev指针给删掉，删掉后，我们就剩下了一条master分支。

创建分支```$ git branch <branchname>```,切换当前分支到新建的分支```$ git checkout <branchname>```, 这两步可以用```$ git checkout -b <branchname>```一起完成。
用```$ git branch```查看已存在的分支。
当新建分支的工作完成后切换回主分支```$ git checkout master``` ,然后合并新建分支内容到主分支```$ git merge <branchname>```，然后删除新建分支```$ git branch -d <branchname>```。

Git鼓励大量使用分支：
```
$ git branch     #查看分支
$ git branch <branchname>   #创建分支
$ git checkout <branchname>     #切换分支
$ git checkout -b <branchname>  #创建+切换分支
$ git merge <branchname>        #合并某分支到当前分支
$ git branch -d <branchname>    #删除(已合并)分支
$ git branch -D <branchname>    #丢弃(未合并)分支
```
	
如果我们新建一个分支并且在这个新建分支上修改文件并提交到版本库后，切换回主分支又再次修改文件提交到版本库。然后我们再合并分支时就会出现冲突，我们可以用```$ git status``` 查看==冲突文件==，然后打开冲突文件，里面有标明冲突内容，手动修改后就可以合并分支啦。最后别忘了删除新建分支，用```$ git log --graph (--pretty=oneline --abbrev-commit)``` 查看分支合并图。  
#### 分支合并模式
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。合并分支时，加上--no-ff参数就可以用普通模式合并```$ git merge --no-ff -m "普通模式合并分支会产生一次提交" <branchname>```，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。  
#### 分支策略
+ master 分支仅用于版本发布，不能在上面干活，是很稳定的。
+ dev 分支是干活的主要场所，当新的开发完成时在合并到 master 分支。
+ 每个人都有自己的 dev 分支，开发完成后合并到 dev 分支。
#### BUG分支
当我们正在 dev 上开发，还没完成不能提交时，可以用 stash 功能将未完成的工作现场，保存起来，等BUG修改完成后在恢复工作现场。  
如，
+ 先用```$ git status```查看出有未添加准备提交的新修改。
+ 用```$git stash```保存工作现场。
+ 再用```$git status```查看到 工作区是干净的
+ 切换到出BUG的分支如 master，```$git checkout master```
+ 创建并切换到BUG分支```$git checkout -b bug01```
+ 修复BUG后添加并提交 ```$git add .```   
    ```$git commmit -m "fixed bug01"```
+ 切换回 master 并合并BUG分支```$git checkout master```  
    ```$git merge --no-ff -m "fixed bug01 and merged it" bug01```
+ 删除BUG分支```$git branch -d bug01```
+ 切换回自己的dev分支```$git checkout dev```
+ 查看工作区```$git status``` 是干净的，那我工作到一半的dev在哪？
+ 用```$git stash list```查看保存的工作现场
+ 用```$git stash apply stash@{0}```来恢复指定的工作现场  
    然后手动删除工作现场```$git stash drop stash@{0}```
    或者直接用```$git stash pop```恢复并删除最近的工作现场。

既然master上面有BUG，那么可能dev上也有同样的BUG，怎么不重复上面的复杂操作修改dev上的BUG呢？用```$git cherry-pick <commit_id>```直接复制修复BUG的修改到当前分区

#### 多人协作
+ 查看远程库信息 ```$git remote```
+ 查看远程库详细信息 ```$git remote -v```
+ 在本地创建远程的dev分支```$git checkout -b dev origin/dev```
+ 推送分支 ```$git push origin <armbranch>```
+ 提交失败有冲突时，先将远程的最新改动拉取过来```$git pull```
+ 拉取失败，可能是拉取的远程分支origin/dev与本地dev没有建立联系关系，用```$git branch --set-upstream-to=origin/dev dev```
建立或者```$git branch --set-upstream dev origin/dev```

### 标签
标签就是一个有意义的名字，跟commit_id绑定。  
>注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。
+ 新打一个标签 ```$git tag <tagname>```  
    (默认打在最近的一次提交上)
+ 在历史提交上打标签 ```$git tag <tagname> <commit_id>```
+ 查看所有标签```$git tag```
+ 给标签添加详细说明```$git tag -a <tagname> -m "详细说明" (<commit_id>)```
+ 查看标签详细信息 ```$git show <tagname>```
+ 删除标签```$git tag -d <tagname>```
+ 推送一个标签```$git push origin <tagname>```
+ 推送所有标签```$git push origin --tags```
+ 删除远程标签  
  - 先```$git tag -d <tagname>```  
  - 再```$git push origin :refs/tags/<tagname>```




