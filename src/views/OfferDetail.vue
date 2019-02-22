<template>
    <div class="offer-detail">
        <div class="offer-card">
            <van-panel title="标题" status="状态">
                <van-cell title="爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大爱仕达大" />
                <van-cell title="1000DET" value="5offer" />
                <div slot="footer">
                    <van-button size="small" type="danger">accept</van-button>
                </div>
            </van-panel>

        </div>
        <van-cell-group>
            <van-field v-model="value" type='textarea' rows='6' placeholder="请在此处粘贴你要提交的内容" />
        </van-cell-group>
        <van-button type="primary" class="success-btn">提交内容</van-button>
    </div>
</template>
