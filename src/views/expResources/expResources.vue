<template>
    <div class="head"><h2>关于fork函数的多进程编程研究</h2></div>
    <p>&nbsp;&nbsp;首先我们来看一下多进程的使用，我们简单的使用fork函数来实现。第一步：我们man fork一下，发现它所依赖的头文件是：sys/types.h和unistd.h。</p>
    <p>代码一:</p>
    <pre><code>
        #include &lt;stdio.h&gt;
        #include &lt;sys/types.h&gt;
        #include &lt;unistd.h&lt;
        main()
        {pid_t pid; //pid_t 类型实际上就是int型 
        pid = fork();
        if(pid &lt; 0)
        printf("erro \n");
        else if(pid == 0){
        printf("child \n");
        }
        else{
        printf("parents \n");
        }}
    </code></pre>
    <p>&nbsp;&nbsp;这个就是最简单的fork使用了，编译一下，输出：</p>
    <pre><code>
        [xdyang@SEP4020 learning]$ ./fork 
        child
        parnts
    </code></pre>
    <p>&nbsp;&nbsp;好了，大家就要开始问了，为什么会这样？同样一个if的判断语句，为什么会要进去两次？其实很简单，这个我们今天这段代码所要实现的功能：多进程。当一个进程调用fork函数后，就会创建一个子进程，子进程会拷贝(见附录二)父进程的代码段，但是拥有自己的数据段。也就是说，其实我们调用了fork函数后，相当于把这个函数代码复制了一遍，也就是产生了类似下面这样的代码：</p>
    <pre><code>
        #include &lt;stdio.h&gt;
        #include &lt;sys/types.h&gt;
        #include &lt;unistd.h&gt;
        main(){

        //进程一                    //进程二
        pid_t pid;                  if(pid &lt; 0)
        pid = fork();               printf("erro \n");
        if(pid &lt; 0)              else if(pid == 0){
        printf("erro \n");          printf("child \n");
        else if(pid == 0){          }
        printf("child \n");         else {
        }                           printf("parnts \n");
        else{                       }
        printf("parnts \n");        }
        }
    </code></pre>
    <p>&nbsp;&nbsp;好了，这样你就可以理解为什么会有两次的if判断了吧，然而，随机而来的问题就是为什么两次if判断的pid的值是不一样的？其实这就是fork的精髓了，就是所谓的一个fork返回两个值。在进程一中，它的返回值为0，那么它会打印child，在进入进程二之后，它会再次赋值 (见附录一)，这时，它就会被赋值为父进程的ID，就会去打印parents了，当然究竟是先被赋值为0还是先被赋值为父进程的ID，这个是由系统的调度算法所决定。</p>
    <p>&nbsp;&nbsp;好了，最基本的东西大家都可以理解了，在上面我们提到说两个进程的数据区是不一样的，那我们用下面的这个代码来做个试验</p>
    <p>代码二:</p>
    <pre><code>
        #include &lt;stdio.h&gt;
        #include &lt;sys/types.h&gt;
        #include &lt;unistd.h&gt;
        main(){
        int i = 0;
        pid_t pid;
        pid = fork();
        if(pid &lt; 0)
        printf("erro \n");
        else if(pid == 0){
        i++;
        printf("child is %d\n", i);
        }
        else{
        i++;
        printf("parnts is %d\n", i);
        }
        }
    </code></pre>
    <p>&nbsp;&nbsp;这个函数的编译后面的执行结果就是：</p>
    <pre><code>
        [xdyang@SEP4020 learning]$ ./fork 
        child is 1
        parnts is 1
    </code></pre>
    <p>&nbsp;&nbsp;我们发现，尽管在上面子进程中执行了i++的操作，父进程中的i值并没有变化，这就证明了两者的数据区其实是不在的一起的。</p>
    <p>&nbsp;&nbsp;好了，理解了上面两点基本上就理解fork的用法，但是在仍然有人遇到了这样一个问题，代码如下：</p>
    <p>代码三:</p>
    <pre><code>
        #include &lt;stdio.h&gt;
        #include &lt;sys/types.h&gt;
        #include &lt;unistd.h&gt;
        main(){
        int i = 0;
        pid_t pid;
        printf("fork");//与代码二相比较多的代码
        pid = fork();
        if(pid &lt; 0)
        printf("erro \n");
        else if(pid == 0){
        i++;
        printf("child is %d\n", i);
        }
        else{
        i++;
        printf("parnts is %d\n", i);
        }
        }
    </code></pre>
    <p>&nbsp;我们预计的打印结果应该是：</p>
    <pre><code>
        forkchild is 1
        parnts is 1
    </code></pre>
    <p>&nbsp;然而，事实无情地告诉我们，结果不是这样的，执行结果如下：</p>
    <pre><code>
        [xdyang@SEP4020 learning]$ ./fork 
        forkchild is 1
        forkparnts is 1
    </code></pre>
    <p>&nbsp;fork竟然被打印了两次，这如何解释，难道说在调用fork之前的代码也会执行两次，难道说我们刚刚的理解是错误的，其实不然，我们又看下面这段代码：</p>
    <p>代码四:</p>
    <pre><code>
        #include &lt;stdio.h&gt;
        #include &lt;sys/types.h&gt;
        #include &lt;unistd.h&gt;
        main(){
        int i = 0;
        pid_t pid;
        printf("fork\n");//注意与代码三的差别
        pid = fork();
        if(pid &lt; 0)
        printf("erro \n");
        else if(pid == 0){
        i++;
        printf("child is %d\n", i);
         
        }
        else{
        i++;
        printf("parnts is %d\n", i);
        }
        }
    </code></pre>
    <p>&nbsp;&nbsp;这个程序执行后的结果如下：</p>
    <pre><code>
        [xdyang@SEP4020 learning]$ ./fork 
        fork
        child is 1
        parnts is 1
    </code></pre>
    <p>&nbsp;&nbsp;这个时候我们就有疑问了，为什么会出现这样的情况呢，其实就是一个\n的差别，这个就需要了解printf的机制了，其实，printf是在接收到\n才刷新串口缓冲区，在一开始，还没有生出子进程的时候，串口缓冲区就已经有数据fork存在了，但是没有被刷新出来。这个时候子进程出来，于是父子进程就都拥有了这个串口缓冲区的数据:fork。于是，就出现了两个fork。</p>
    <p>附录一： <br> &nbsp;&nbsp;仔细研究一下，原来系统是这样的，我们可以把fork分为2步，一步是创建一个新的进程，一步为返回。当我们执行第一步的时候，就会创建一个新的进程，在返回之前我们就拥有了两个进程，比如我们假设子进程先执行，那么此时创建了一个新的进程后，我们就认为下面的执行都是在子进程中了，所以会有一个返回值，那么子进程执行完成时，就会轮到父进程了，而父进程从什么地方开始呢，它就是从我们上面我们进程创建之后，fork返回之前开始执行，于是又有了一个新的返回值，这样说理解清楚了吧，呵呵~~</p>
    <p>附录二： <br> &nbsp;&nbsp;介绍一个copy-on-write的概念，也就是写时拷贝的概念，我们知道fork在创建子进程的时候需要拷贝父进程的代码和数据，其实在linux中的真实情况并不是说再调用fork就会进行拷贝的，而是一个共享的概念，就是没有改变的地方我们并不会进行一个拷贝，而是共享原来的，但怎样才能造成现实显示的数据段分开的效果呢，我们会在执行的时候，当发生数据写入的时候进行拷贝，也就是说数据有了变化我们将会进行拷贝，这样就可以提高效率和空间利用率了。</p>
</template>

<script setup lang='ts'>


</script>

<style scoped lang="scss">
.head {
    padding-left: 40%;
    margin-bottom: 20px;
}
p  {
     font-size: 20px;
}
code {
    font-size: 18px;
}

</style>