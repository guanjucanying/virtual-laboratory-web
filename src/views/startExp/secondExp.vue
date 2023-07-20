

<template>
  <div class="mask" v-if="isMaskShow" @click.stop.prevent>
    <img src="../../img/代码雨.gif" alt="" />
    <span id="countdown" style="text-align: center"
      >{{ countdown }}s...
      <br />
      <span v-if="showMessage" id="countMessage">{{ countMessage }}</span>
    </span>
  </div>
  <div class="secondExp" :class="{ 'no-scroll': isMaskShow }">
    <div class="messageBox">
      <div class="text">
        <span id="message">{{ message }}</span>
      </div>
    </div>
    <div class="detailExp">
      <div class="top">
        <img src="../../img/Pause.png" alt="" class="pause" />
        <img
          src="../../img/right.png"
          alt=""
          style="width: 80px; height: 80px"
          class="right"
        />
        <div class="BIOS-box">
          <img src="../../img/BIOS用图.png" alt="" class="BIOS" />
          <el-popover
            content="下一步点击磁盘中的bootsect.s按钮"
            hide-icon="true"
            trigger="click"
            placement="top-start"
          >
            <template #reference>
              <el-button
                id="BIOS"
                ref="button1"
                @click="
                  onClick(1);
                  BIOSClick();
                "
              >
                BIOS
                <br />
                程序
              </el-button>
            </template>
          </el-popover>
        </div>
        <button class="submit" @click="subText">提交实验</button>
      </div>

      <div class="bottom">
        <div class="down-direction">
          <img
            src="../../img/down.png"
            alt=""
            style="width: 80px; height: 80px"
            class="down"
          />
        </div>
        <div class="step">
          <div class="CPU-box" style="position: relative">
            <img src="../../img/CPU.png" alt="" class="CPU" />
            <!-- BIOS按钮 -->
            <el-button
              id="BIOS-button"
              ref="button1"
              style="margin-left: -20px; margin-top: -140px; display: none"
            >
              BIOS
              <br />
              程序
            </el-button>

            <!-- bootsect按钮 -->
            <el-button
              class="button"
              id="bootsectThird"
              style="
                display: block;
                margin-left: -60px;
                margin-top: -95px;
                display: none;
                position: absolute;
              "
              >bootsect.s</el-button
            >
            <!-- setup按钮 -->
            <el-button
              class="button"
              id="setupThird"
              style="
                display: block;
                margin-left: -60px;
                margin-top: -50px;
                display: none;position: absolute;
              "
              >setup.s</el-button>
          </div>
          <!-- 内存 -->
          <div class="memory">
            <div class="list-detail">
              <ul class="list-text">
                <li>0X0000</li>
                <li>0X7C00</li>
                <li>0x90200</li>
                <li>0x10000</li>
                <li>......</li>
              </ul>
              <ul class="bordered-list">
                <li>
                  <el-button
                    class="button"
                    id="systemCopy"
                    style="margin-top: -7px; display: none; position: relative"
                    >system</el-button
                  >
                </li>
                <li>
                      <el-button
                        class="button"
                        id="bootsect"
                        ref="button"
                        @click="
                          onClick(3);
                          bootsectThirdClick();
                        "
                        style="margin-top: -7px; display: none"
                        >bootsect.s</el-button
                      >
                </li>
                <li>
                  <el-button
                    class="button"
                    id="setup"
                    @click="
                      onClick(6);
                      setupThirdClick();
                    "
                    style="margin-top: -7px; display: none"
                    >setup.s</el-button
                  >
                </li>
                <li>
                  <el-button
                    class="button"
                    id="system"
                    @click="
                      onClick(7);
                      systemCopyClick();
                    "
                    style="margin-top: -7px; display: none; position: relative"
                    >system</el-button
                  >
                </li>
                <li></li>
              </ul>
            </div>
            <span style="font-weight: bolder; margin: auto">内存</span>
          </div>
          <!-- 磁盘 -->
          <div class="disk">
            <div class="buttons">
              <div
                class="button-first"
                @click="
                  onClick(2);
                  clickBootsect();
                "
              >
                <el-popover
                  content="存放至内存 0x7C00 区，下一步点击内存中的bootsect.s，再点击磁盘中的setup.s按钮"
                  trigger="click"
                  placement="top-start"
                >
                  <template #reference>
                    <el-button class="button">bootsect.s</el-button>
                  </template>
                </el-popover>
              </div>

              <div
                class="button-second"
                @click="
                  onClick(4);
                  clickSetup();
                "
                :disabled="isCountingDown"
              >
                <el-popover
                  content=" 存放至内存 0x90200 区，下一步点击磁盘中的system按钮 "
                  trigger="click"
                  placement="top-start"
                >
                  <template #reference>
                    <el-button class="button" ref="button2">setup.s</el-button>
                  </template>
                </el-popover>
              </div>
              <div
                class="button-third"
                @click="
                  onClick(5);
                  clickSystem();
                "
              >
                <el-popover
                  content="存放至内存 0x10000 区，下一步点击内存中的setup.s按钮，再点击内存中的system按钮"
                  trigger="click"
                  placement="bottom-start"
                >
                  <template #reference>
                    <el-button class="button" ref="button1">system</el-button>
                  </template>
                </el-popover>
              </div>

              <el-button class="button">......</el-button>
            </div>

            <span style="font-weight: bolder">磁盘</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

const message = ref("请点击相应程序，执行操作系统的过程控制和管理");
const isMaskShow = ref(false);
const countdown = ref(0);
const isCountingDown = ref(false);
const isClicked = ref(true);

const router = useRouter();

// 倒计时方法
const startCountdown = () => {
  if (isCountingDown.value) {
    return;
  }
  isCountingDown.value = true;
  countdown.value = 3;
  let timer = setInterval(() => {
    countdown.value--;
    if (countdown.value === 0) {
      clearInterval(timer);
      isCountingDown.value = false;
      isMaskShow.value = false;
    }
  }, 1000);
};

// 按顺序点击按钮
const clickOrder = ref(1);
const onClick = (order: number) => {
  if (order === clickOrder.value) {
    clickOrder.value++;
    // 处理当前按钮被点击后的逻辑
    console.log(`Button ${order + 1} clicked`);
    isClicked.value = true;
    // isSuccess.value = 0;
  } else {
    // isSuccess.value = 1;
    isClicked.value = false;
    console.log("点击顺序错误");
    message.value = "请按顺序执行操作！";
    let fontColor = document.querySelector("#message") as HTMLElement;
    fontColor.style.color = "red";
  }
};

// 按钮一：点击BIOS程序按钮
const BIOSClick = () => {
  if (isClicked.value) {
    let BIOS = document.querySelector("#BIOS-button") as HTMLElement;
    BIOS.style.display = "block";
    message.value = "执行bios程序中...";
    isMaskShow.value = !isMaskShow.value;
    startCountdown();
    message.value = "请加载bootsect.s";
  }
};

// 按钮二：点击Bootsect按钮
const clickBootsect = () => {
  if (isClicked.value) {
    let BIOS = document.querySelector("#BIOS-button") as HTMLElement;
    BIOS.style.display = "none";
    let bootsect = document.querySelector("#bootsect") as HTMLElement;
    bootsect.style.display = "block";
    message.value = "BIOS执行完毕";
    isMaskShow.value = !isMaskShow.value;
    startCountdown();
  }
};

// 按钮三：拖拽Bootsect至CPU
// 提示信息：执行bootsect引导程序...
const bootsectThirdClick = () => {
  if (isClicked.value) {
    let active = document.querySelector("#bootsectThird") as HTMLElement;
    active.style.display = "block";
    message.value = "执行bootsect引导程序...";
    isMaskShow.value = !isMaskShow.value;
    startCountdown();
  }
};

// 按钮四：点击setup.s按钮
const clickSetup = () => {
  if (isClicked.value) {
    console.log("12313123213");
    console.log(isClicked.value);

    let setup = document.querySelector("#setup") as HTMLElement;
    setup.style.display = "block";
    message.value = "bootsect执行中...    setup.s加载完毕";
    isMaskShow.value = !isMaskShow.value;
    startCountdown();
  }
};
// 按钮五：点击system按钮
// 提示信息：bootsect执行中...    system加载完毕
const clickSystem = () => {
  if (isClicked.value) {
    console.log("444");

    let system = document.querySelector("#system") as HTMLElement;
    system.style.display = "block";
    message.value = "bootsect执行中...    system加载完毕";
    isMaskShow.value = !isMaskShow.value;
    startCountdown();
  }
};

// 按钮六：拖拽setup.s进入cpu
// 提示信息：setup.s执行中...
const setupThirdClick = () => {
  if (isClicked.value) {
    let active = document.querySelector("#setupThird") as HTMLElement;
    active.style.display = "block";
    message.value = "setup.s执行中...";
    isMaskShow.value = !isMaskShow.value;
    startCountdown();
  }
};

// const isClicked = ref(false)
// 按钮七：拖拽到0x0000
// 提示信息：setup.s执行结束，开始执行system
const systemCopyClick = () => {
  if (isClicked.value) {
    let active = document.querySelector("#systemCopy") as HTMLElement;
    active.style.display = "block";
    message.value = "setup.s执行结束，开始执行system";
    isMaskShow.value = !isMaskShow.value;
    firstShow();
    console.log(1111111111111);

    setTimeout(() => {
      isMaskShow.value = !isMaskShow.value;
      secondShow();
      console.log(22222222222);
      setTimeout(() => {
        isMaskShow.value = !isMaskShow.value;
        thirdShow();
        console.log(3333333333);
      }, 4000);
    }, 4000);
  }
};

const showMessage = ref(false);
const countMessage = ref("");
// 点击显示   0号进程创建完毕
const firstShow = () => {
  if (isCountingDown.value) {
    return;
  }
  isCountingDown.value = true;
  countdown.value = 2;
  let timer = setInterval(() => {
    countdown.value--;
    showMessage.value = true;
    countMessage.value = "0号进程创建完毕";
    if (countdown.value === 0) {
      clearInterval(timer);
      isCountingDown.value = false;
      isMaskShow.value = false;
    }
  }, 2000);
};

const secondShow = () => {
  console.log(2);
  if (isCountingDown.value) {
    return;
  }
  isCountingDown.value = true;
  countdown.value = 2;
  let timer = setInterval(() => {
    countdown.value--;
    showMessage.value = true;
    countMessage.value = "0号进程创建1号、2号进程完毕";
    if (countdown.value === 0) {
      clearInterval(timer);
      isCountingDown.value = false;
      isMaskShow.value = false;
    }
  }, 2000);
};

const thirdShow = () => {
  console.log(3);
  if (isCountingDown.value) {
    return;
  }
  isCountingDown.value = true;
  countdown.value = 2;
  let timer = setInterval(() => {
    countdown.value--;
    showMessage.value = true;
    countMessage.value = "1号进程创建用户进程完毕";
    if (countdown.value === 0) {
      clearInterval(timer);
      isCountingDown.value = false;
      isMaskShow.value = false;
      router.push("/thirdExp");
    }
  }, 2000);
};

// 提交实验
const subInfo = ref({
  userAccount: localStorage.getItem("userAccount"),
  endTime: 0,
});
const subText = () => {
  subInfo.value.endTime = new Date().getTime()
  axios.put("/api/v1/data_record_res", subInfo.value).then((res) => {
    console.log(res);
  });
  router.push("/startExp");
};

const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (target.tagName !== "BUTTON" && target.tagName !== "SPAN" && target.tagName !== "IMG" ) {
    console.log(target.tagName);
    message.value = "请按顺序执行操作！";
    let fontColor = document.querySelector("#message") as HTMLElement;
    fontColor.style.color = "red";
  } else if (isClicked.value) {
    let fontColor = document.querySelector("#message") as HTMLElement;
    fontColor.style.color = "#028102";
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});
</script>

<style lang="scss">
#BIOS,
#BIOS-button {
  position: absolute;
  background-color: #fff;
  width: 70px;
  height: 40px;
  margin-top: 44px;
  margin-left: -110px;
  font-weight: bolder;
}
.el-popconfirm__action {
  height: 0 !important;
  margin: 0 !important;
  .el-button--small {
    padding: 0 !important;
    --el-button-size: 0px !important;
  }
}

el-button:click {
  color: #169bd5;
}
.no-scroll {
  overflow: hidden;
}

.mask {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 9999;

  img {
    margin: auto;
    margin-bottom: 15px !important;
  }
  span#countdown {
    display: block;
    margin: auto;
    margin-top: 0 !important;
    // margin-bottom: 10px !important;
    color: #028102;
    font-size: 18px;
    font-weight: bolder;
  }
  // #countMessage{
  //   display: block;
  //   margin: auto;
  //   margin-top: 0 !important;
  //   color: #028102;
  //   font-size: 18px;
  //   font-weight: bolder;
  // }
}
.secondExp {
  width: 100%;
  height: auto;
  // margin:10px;
  display: flex;
  flex-direction: column;

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
    img {
      width: 150px;
      height: 150px;
    }
    .top {
      display: flex;
      margin: auto;
      padding-bottom: 10px;
      .pause {
        margin-left: -280px;
        margin-right: 140px;
      }
      .right {
        margin: 30px 70px 0 -80px;
      }
      button.submit {
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
    // .down {
    //   margin: 40px 0 30px 195px;
    // }
    .bottom {
      display: flex;
      flex-direction: column;
      margin: auto;
      padding-top: 10px;
      .down-direction {
        .down {
          margin: 30px 0 30px -30px;
        }
      }
      .step {
        display: flex;
        .CPU {
          margin-left: -60px;
          margin-right: 60px;
        }
        .memory {
          display: flex;
          flex-direction: column;
          width: 240px;
          // margin-right: 80px;
          .list-detail {
            display: flex;
            flex-direction: row;
            .list-text {
              list-style: none;
              padding: 0;
              margin: auto;
              width: 80px;
              // border: 1px solid #000;
              li {
                height: 35px;
                padding-top: 10px;
                text-align: center;
              }
            }
            .bordered-list {
              list-style: none;
              padding: 0;
              margin: auto;
              border: 1px solid #000;
              width: 152px;
              li {
                // padding: 15px;
                height: 35px;
                padding-top: 10px;
                text-align: center;
                border-bottom: 1px solid #000;
              }
              li:last-child {
                border-bottom: none;
              }
            }
          }
        }

        .disk {
          width: 280px;
          height: 280px;
          background-color: #d7d7d7;
          display: flex;
          flex-direction: column;
          border-radius: 50%;
          text-align: center;
          position: relative;
          .buttons {
            margin: auto;
            margin-bottom: 0px;
            margin-top: 40px;
          }
        }
      }
    }
  }
}
.button {
  width: 150px;
  height: 40px;
  background-color: #fff;
  border: none;
  margin-bottom: 8px;
  font-weight: bolder;
  font-size: 18px;
}
</style>