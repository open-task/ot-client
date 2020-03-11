<template>
    <div class="bount-test create-offer">
        <div class="input-group">
            <div class="title"><span>Bountinet 内测系统正式上线了！</span></div>
            <div class="desc">Bountinet 内测系统正式上线了！欢迎各界技术大咖来内测使用！以下内容是Bountinet系统使用说明书。</div>
            <div class="detail">
                <h3>整体流程：</h3>
                <p class="bount-step-txt">目前支持一个账户发布任务也可以解决任务，并发布自有的技能特长。我们暂且称作 publisher 和 solver，分别用来发布和解决任务。</p>
                <ul>
                    <li>1. publisher可以发布任务，发布成功后，会出现在任务列表里；</li>
                    <li>2. solver浏览任务列表，对感兴趣的任务，提交解决方案；</li>
                    <li>3. publisher浏览到解决方案，查看审阅，给予接受或拒绝的处理；</li>
                    <li>4. 如果方案被接受，solver能得到对应的赏金； </li>
                </ul>
                <h3 class="bount-step-title">1. 主页</h3>
                <p class="bount-step-txt">访问imToken APP，点击首页下的”浏览“按钮，输入访问地址：<a href="https://bountinet.com">https://bountinet.com</a> ，会进入首页，通过首页可以进入任一个功能模块。如图所示：</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step01.png" alt="主页">
                </div>
                <h3 class="bount-step-title">2. 发布任务</h3>
                <p class="bount-step-txt">点击首页中的“发布任务”，输入项目名称、描述和所需技能，填入具体的悬赏金额（以DET为单位），即可发布自己的任务。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step02.png" alt="发布任务">
                </div>
                <p class="bount-step-txt">点击确认后，会自动唤起MetaMask插件两次，第一次是授信给Bountinet合约相应的金额，第二次是真正的发布到区块链上，供全网播报。</p>
                <p class="bount-step-txt">授信的意思是，用私钥签名，授权Bountinet合约相应的额度，可以直接转走花掉，参考信用卡预授权。注意确认网络、帐户、金额。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step04.png" alt="发布任务">
                </div>
                <p class="bount-step-txt">授信成功后，即开始发布任务到区块链上，这一步会直接扣掉相应的DET（抵押给合约），用于后续结算。注意确认网络、帐户、合约地址。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step05.png" alt="发布任务">
                </div>
                <p class="bount-step-txt">以上确认完成，几分钟后，列表中就会出现我们发布的新任务，供大家浏览解决，争取悬赏金。</p>
                <h3 class="bount-step-title">3. 任务列表</h3>
                <p class="bount-step-txt">是已经发布的任务列表，按时间逆序排列，越近的越靠前。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step06.png" alt="任务列表">
                </div>
                <h3 class="bount-step-title">4. 解决任务</h3>
                <p class="bount-step-txt">点击任务列表中“待解决”任务，可进入任务详情页。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step07.png" alt="解决任务">
                </div>
                <p class="bount-step-txt">点击“提交我的解决方案”按钮，进入“解决方案”页面。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step08.png" alt="解决任务">
                </div>
                <p class="bount-step-txt">输入解决方案到文本框中，然后点击“提交方案”。同之前发布任务类似，点击按钮会自动呼起MetaMask插件，请求确认交易，点击确认即可。确认后，解决方案即录入，几分钟等待后，可以在任务详情页看到该方案。任务状态为“已提交”；</p>
                <p class="bount-step-txt" style="color:red;">注：任务允许多次提交解决方案。发布者只能接受其中一个方案。</p>
                <div class="bount-step-img">
                    <img src="/img/bount-step09.png" alt="解决任务">
                </div>
                <h3 class="bount-step-title">5. 接受或者拒绝任务</h3>
                <p class="bount-step-txt">查看任务的解决方案页面，点击accept和reject按钮进行确认或拒绝。点击按钮时，会像之前的操作一样呼起MetaMask插件。点击“确认”并支付赏金给solver。该发布的任务事务结束，任务状态为”已解决“。 </p>
                <div class="bount-step-img">
                    <img src="/img/bount-step10.png" alt="接受或者拒绝任务">
                </div>
                <h3 class="bount-step-title">6. 发布技能</h3>
                <p class="bount-step-txt">从首页点击”提交技能“标签，可进入技能填写页面。 </p>
                <div class="bount-step-img">
                    <img src="/img/bount-step11.png" alt="接受或者拒绝任务">
                </div>
                <p class="bount-step-txt">输入技能，或选择技能标签，并填写有效的邮箱地址（以便与任务发布者联系）。点击”提交“按钮，即可进入技能列表。</p>
                <h3 class="bount-step-title">7. 技能列表</h3>
                <p class="bount-step-txt">从点击首页下发的”技能列表“按钮，即可进入技能列表页面。 </p>
                <div class="bount-step-img">
                    <img src="/img/bount-step12.png" alt="接受或者拒绝任务">
                </div>
                <p class="bount-step-txt">击某个技能标签，即可查看到该表现的技能人才详情。</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .bount-test {
        padding-top: 30px;

        .title {
            font-size: 16px;
        }
        
        .input-group{
            padding: 10px 15px;
            .desc {
                font-size: 12px;
                color: #999;
                padding: 10px 0 10px 12px;
                border-bottom: 1px solid #F2F2F2;
                line-height: 20px;
            }
            .detail {
                padding: 10px 0 30px; 
                color: #666;
                font-size: 14px;
                line-height: 26px;

                a {
                    color: #3C8FFB;
                }

                h3 {
                    font-size: 14px;
                    font-weight: 400;
                    margin-top: 0;
                    margin-bottom: 10px;
                }

                .bount-step-title {
                    color: #333;
                    margin-top: 16px;
                }

                .bount-step-txt {
                    line-height: 20px;
                    margin-bottom: 10px;
                }

                .bount-step-img  {
                    padding-bottom: 16px;
                    img {
                        width: 72%;
                        display: block;
                        margin: 0 auto;
                    }
                    
                }
            }
            
        }
    }
</style>