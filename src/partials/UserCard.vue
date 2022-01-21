<template>
  <div class="user-card" :class="{ 'is-compact': config.isCompact }">
    <template v-if="!config.isCompact">
      <div class="media">
        <figure
          class="media-left"
          :class="{ 'is-clickable': config.redirect || config.route }"
          @click="redirectToProfile()"
        >
          <span :class="`profile-initial`">
            <figure class="image" v-if="config.picture">
              <img :src="config.picture" alt="" loading="lazy" />
            </figure>
            <template v-if="!config.picture">
              {{ config.name ? config.name.charAt(0) : 'G' }}
            </template>
          </span>
        </figure>
        <div class="media-content">
          <p
            class="user-name"
            :class="{ 'is-clickable': config.redirect || config.route }"
            @click="redirectToProfile()"
          >
            <span> {{ config.name }} </span>
          </p>
          <p class="user-detail">
            <span v-if="config.detail"> {{ config.detail }} </span>
            <span v-if="config.description">{{ config.description }} </span>
          </p>
          <slot name="detail"></slot>
        </div>
        <div class="media-right">
          <slot></slot>
        </div>
      </div>
    </template>
    <template v-if="config.isCompact">
      <div class="media">
        <figure
          class="media-left"
          :class="{ 'is-clickable': config.redirect || config.route }"
          @click="redirectToProfile()"
        >
          <span :class="`profile-initial`">
            <figure class="image" v-if="config.picture">
              <img :src="config.picture" alt="" loading="lazy" />
            </figure>
            <template v-if="!config.picture && config.name">
              {{ config.name.charAt(0) }}
            </template>
          </span>
        </figure>
        <div class="media-content">
          <p
            class="user-name"
            :class="{ 'is-clickable': config.redirect || config.route }"
            @click="redirectToProfile()"
          >
            <span> {{ config.name }} </span>
          </p>
          <p class="user-detail" v-if="config.detail">
            <span> {{ config.detail }} </span>
          </p>
          <p class="user-detail" v-if="config.description">
            {{ config.description }}
          </p>
          <slot name="detail"></slot>
        </div>
        <div class="media-right">
          <slot></slot>
        </div>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue';
import router from '@/router';
import { IUserCard } from '.';

// @ is an alias to /src
export default defineComponent({
  props: {
    config: {
      type: Object as PropType<IUserCard>,
      required: true,
    },
  },
  setup(props) {
    const { config } = props;
    const redirectToProfile = () => {
      if (config.redirect) {
        window.open(`${config.redirect}`, '_blank');
      }
      if (config.route) {
        router.push(config.route);
      }
    };

    return { redirectToProfile };
  },
});
</script>

<style lang="scss">
@import '../bulma/elements/tag';
.user-card {
  .open-chat {
    margin-right: 0.5rem;
  }
  .media-right {
    background: none !important;
  }
  .tag {
    display: block;
    max-width: 16rem;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: flex-start;
    overflow: visible;
    max-width: none;

    span {
      height: 1.75rem;
      vertical-align: middle;
    }
  }
}
.user-card {
  .profile-initial {
    display: block;
    height: 6rem;
    width: 6rem;
    line-height: 6rem;
    font-size: $size-3;
    border-radius: $radius;
    background: $black;
    color: $white;
    overflow: hidden;
    margin: 0;
    text-align: center;
  }

  .user-name {
    display: block;
    margin-top: 0rem;
    font-size: $size-5;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: $black;
    white-space: nowrap;
  }
  a.user-name:hover {
    color: $primary;
  }
  .media {
    max-width: 100%;
    position: relative;
    .media-right {
      position: absolute;
      right: 0;
      top: 0;
      margin: 0;
      transition: 0.2s ease;
      .button {
        min-width: 0;
      }
      @include mobile {
        position: relative;
      }
    }
    &:hover {
      .media-right {
        opacity: 1;
        background: $white;
        border-radius: $radius;
      }
    }
    .user-name,
    .user-detail {
      text-align: left;
    }
  }
  .user-detail {
    display: block;
    margin-bottom: 1rem;
    font-size: $size-7;
    color: $grey-dark;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    max-width: 18rem;
    @include mobile {
      max-width: 10rem;
    }
  }

  &.is-compact {
    .profile-initial {
      height: 4rem;
      width: 4rem;
      line-height: 4rem;
    }
    .user-name {
      font-size: $size-6;
      &.is-clickable:hover {
        color: $primary;
      }
    }
    .user-detail {
      font-size: $size-7;
    }
  }
  .is-clickable {
    cursor: pointer;
  }
}
</style>
