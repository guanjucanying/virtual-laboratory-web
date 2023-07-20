<template>
  <div class="thirdExp">
    <!-- 提示信息 -->
    <div class="messageBox">
      <div class="text">
        <span>{{ message }}</span>
      </div>
    </div>
    <div class="detailExp">
      <div class="top">
        <div class="left">
          <div class="diamond"><p>0号进程</p></div>
          <div>
            <div style="display: inline-block">
              <img src="@/img/down.png" alt="" />
              <div class="diamond"><p>2号进程</p></div>
            </div>
            <div style="display: inline-block">
              <img src="@/img/down.png" alt="" />
              <div class="diamond"><p>1号进程</p></div>
            </div>
          </div>
          <div v-if="user09">
            <div style="float: right">
              <img src="@/img/down.png" alt="" />
              <div class="user" @click="clickUser(9)">
                <div class="tooltip">点击将用户进程移至cpu区</div>
                <p>用户进程</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cpu">
          <div class="user" v-if="user10" @click="clickUser(10)">
            <div class="tooltip">{{ user10_tooltip }}</div>
            <p>用户进程</p>
          </div>
        </div>
        <div class="btn">
          <button @click="subText">提交实验</button>
        </div>
      </div>
      <div class="bottom">
        <div class="blockQueue queue">
          <div class="block_item queue_item"></div>
          <div class="block_item queue_item"></div>
          <div class="block_item queue_item"></div>
          <div class="block_item queue_item"></div>
          <div class="block_item queue_item">
            <div class="user" v-if="user11" @click="clickUser(11)">
              <div class="tooltip">点击将用户进程移至就绪队列</div>
              <p>用户进程</p>
            </div>
          </div>
          <div
            class="block_item queue_item"
            style="height: 25px; border-bottom: 1px solid #000"
          >
            阻塞队列
          </div>
        </div>
        <div class="readyQueue queue">
          <div class="ready_item queue_item"></div>
          <div class="ready_item queue_item"></div>
          <div class="ready_item queue_item"></div>
          <div class="ready_item queue_item"></div>
          <div class="ready_item queue_item">
            <div class="user" v-if="user12" @click="clickUser(12)">
              <div class="tooltip">点击将用户进程移至cpu区</div>
              <p>用户进程</p>
            </div>
          </div>
          <div
            class="ready_item queue_item"
            style="height: 25px; border-bottom: 1px solid #000"
          >
            就绪队列
          </div>
        </div>
      </div>
    </div>
    <div class="maskLayer" v-if="layerShow">
      <div class="content">
        <img src="@/img/代码雨.gif" alt="" />
        <div>{{ count }} S...</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
// 提示信息
const message = ref("1号进程创建用户进程完毕");
// 控制用户进程显隐
const user09 = ref(true);
const user10 = ref(false);
const user11 = ref(false);
const user12 = ref(false);
const layerShow = ref(false);
const count = ref(3);
// 遮罩层
const maskLayer = (news1: string, news2: string) => {
  layerShow.value = true;
  message.value = news1;
  countDown(news2);
};
const userShow = ref(true);
const user10_tooltip = ref("点击将用户进程移至阻塞队列");
// 点击用户进程
const clickUser = (step: number) => {
  console.log(step);
  switch (step) {
    case 9:
      user09.value = false;
      user10.value = true;
      maskLayer("用户进程执行中...", "用户进程因等待IO操作而阻塞");
      break;
    case 10:
      if (userShow.value) {
        user10.value = false;
        user11.value = true;
        maskLayer("进程阻塞中...", "IO完成");
        userShow.value = false;
        user10_tooltip.value = "实验已结束,请点击提交实验";
      }
      break;
    case 11:
      user11.value = false;
      user12.value = true;
      maskLayer("用户进程等待调度", "由调度进程调度用户进程至cpu执行");
      break;
    case 12:
      user12.value = false;
      user10.value = true;
      maskLayer("用户进程继续执行...", "用户进程执行完毕，进程终止");
      break;
  }
};
//倒计时对象
let timer: any = null;
const countDown = (news: string) => {
  const TIME_COUNT = 3;
  if (!timer) {
    count.value = TIME_COUNT;
    timer = setInterval(() => {
      if (count.value > 1 && count.value <= TIME_COUNT) {
        //限制倒计时区间
        count.value--;
      } else {
        clearInterval(timer); //删除定时器
        timer = null;
        //三秒后关闭（三秒后需要进行的操作）
        layerShow.value = false;
        message.value = news;
      }
    }, 1000);
  }
};
// 提交实验
const subInfo = ref({
  userAccount: localStorage.getItem("userAccount"),
  endTime: 0,
});
const subText = async () => {
  subInfo.value.endTime = new Date().getTime()
  axios.put("/api/v1/data_record_res", subInfo.value).then((res) => {
    console.log(res);
  });
  router.push("/startExp");
};
</script>

<style lang="scss" scoped>
.thirdExp {
  width: 100%;
  height: auto;
  // margin:10px;
  display: flex;
  flex-direction: column;
  position: relative;
  .messageBox {
    width: 100%;
    height: auto;
    background-color: #f2f2f2;
    display: flex;
    .text {
      width: auto;
      line-height: 45px;
      font-weight: bolder;
      margin: 0 auto;
      span {
        display: inline-block;
        margin: 0 auto;
        color: #028102;
      }
    }
  }
  .detailExp {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
    justify-content: space-around;
    text-align: center;
    img {
      width: 200px;
      height: 200px;
    }
    .top {
      display: flex;
      padding-bottom: 10px;
      justify-content: space-around;
      // .pause {
      //   margin-left: -280px;
      //   margin-right: 140px;
      // }
      // .right {
      //   margin: 30px 70px 0 -80px;
      // }
      .left {
        img {
          width: 100px;
          height: 100px;
        }
        .diamond {
          background: #e9e9e9;
          margin: 10px;
          padding: 10px;
        }
      }
      .cpu {
        width: 200px;
        height: 200px;
        background: url("~@/img/CPU.png");
        background-size: 200px 200px;
        position: relative;
        .user {
          position: absolute;
          width: 100px;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
      button {
        width: 120px;
        height: 40px;
        font-size: 15px;
        position: absolute;
        right: 20px;
        border: 1px solid #fff;
        background-color: #169bd5;
        color: #fff;
        border-radius: 8px;
      }
    }
    .bottom {
      display: flex;
      margin: auto;
      .queue {
        width: 200px;
        margin: 0 10px;
        .queue_item {
          height: 50px;
          border: 1px solid #000;
          border-color: #000 #000 transparent #000;
          .user {
            margin: 3px;
          }
        }
      }
      // .readyQueue{}
    }
  }
  .maskLayer {
    position: absolute;
    background: rgba(215, 215, 215, 0.6);
    width: 100%;
    height: 100%;
    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      color: #028102;
      font-weight: 800;
      font-size: 20px;
    }
  }
  .user {
    position: relative;
    border: 1px solid #000;
    padding: 10px;
    border-radius: 5px;
  }
  .user:hover {
    background-color: #eee;
    cursor: pointer;
  }

  .user .tooltip {
    background: #f5f5f5;
    bottom: 100%;
    color: #000;
    display: block;
    left: -25px;
    margin-bottom: 15px;
    opacity: 0;
    padding: 20px;
    pointer-events: none;
    position: absolute;
    width: 100%;
    -webkit-transform: translateY(10px);
    -moz-transform: translateY(10px);
    -ms-transform: translateY(10px);
    -o-transform: translateY(10px);
    transform: translateY(10px);
    -webkit-transition: all 0.25s ease-out;
    -moz-transition: all 0.25s ease-out;
    -ms-transition: all 0.25s ease-out;
    -o-transition: all 0.25s ease-out;
    transition: all 0.25s ease-out;
    -webkit-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -moz-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -ms-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    -o-box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
    box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.28);
  }

  /* This bridges the gap so you can mouse into the tooltip without it disappearing */
  .user .tooltip:before {
    bottom: -20px;
    content: " ";
    display: block;
    height: 20px;
    left: 0;
    position: absolute;
    width: 100%;
  }

  /* CSS Triangles - see Trevor's post */
  .user .tooltip:after {
    border-left: solid transparent 10px;
    border-right: solid transparent 10px;
    border-top: solid #f5f5f5 10px;
    bottom: -10px;
    content: " ";
    height: 0;
    left: 50%;
    margin-left: -13px;
    position: absolute;
    width: 0;
  }

  .user:hover .tooltip {
    opacity: 1;
    pointer-events: auto;
    -webkit-transform: translateY(0px);
    -moz-transform: translateY(0px);
    -ms-transform: translateY(0px);
    -o-transform: translateY(0px);
    transform: translateY(0px);
  }

  /* IE can just show/hide with no transition */
  .lte8 .user .tooltip {
    display: none;
  }

  .lte8 .user:hover .tooltip {
    display: block;
  }
}
</style>
